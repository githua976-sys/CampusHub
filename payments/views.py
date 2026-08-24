from django.shortcuts import render
import uuid
# Create your views here.

from django.db import transaction as db_transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from students.models import Student

from .models import Transaction
from .serializers import TransactionSerializer
from .services import MpesaService


class InitiatePaymentView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = request.data.get("amount")
        phone_number = request.data.get("phone_number")

        if not amount:
            return Response(
                {"error": "Amount is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not phone_number:
            return Response(
                {"error": "Phone number is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            student = Student.objects.get(
                user=request.user
            )
        except Student.DoesNotExist:
            return Response(
                {
                    "error":
                    "Authenticated user is not registered as a student."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        reference = (
            f"INV-"
            f"{uuid.uuid4().hex[:8].upper()}"
        )

        payment = Transaction.objects.create(
            student=student,
            phone_number=phone_number,
            amount=amount,
            reference=reference,
        )

        try:

            mpesa_service = MpesaService()

            response = mpesa_service.initiate_stk_push(
                phone_number=phone_number,
                amount=amount,
                account_reference=reference,
                transaction_desc=(
                    f"CampusHub payment {reference}"
                ),
            )

            if response.get("ResponseCode") == "0":

                payment.merchant_request_id = (
                    response.get("MerchantRequestID")
                )

                payment.checkout_request_id = (
                    response.get("CheckoutRequestID")
                )

                payment.save()

                return Response(
                    {
                        "message":
                            "STK Push initiated successfully",

                        "reference":
                            reference,

                        "checkout_request_id":
                            payment.checkout_request_id,

                        "status":
                            payment.status,
                    },
                    status=status.HTTP_200_OK
                )

            payment.status = (
                Transaction.StatusChoices.FAILED
            )

            payment.result_description = (
                response.get("ResponseDescription")
            )

            payment.save()

            return Response(
                {
                    "error":
                        "Failed to initiate STK Push",

                    "details":
                        response.get("ResponseDescription"),
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:

            payment.status = (
                Transaction.StatusChoices.FAILED
            )

            payment.result_description = str(e)

            payment.save()

            return Response(
    {
        "error": "An error occurred while initiating payment.",
        "details": str(e),
    },
    status=status.HTTP_500_INTERNAL_SERVER_ERROR
)

class PaymentStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, reference):

        payment = get_object_or_404(
            Transaction,
            reference=reference
        )

        if payment.student.user != request.user:
            return Response(
                {"error": "You do not have permission to view this payment."},
                status=status.HTTP_403_FORBIDDEN
            )

        return Response(
            TransactionSerializer(payment).data
        )


@api_view(["POST"])
@permission_classes([])
def mpesa_callback_view(request):

    data = request.data

    stk_callback = (
        data
        .get("Body", {})
        .get("stkCallback", {})
    )

    checkout_request_id = (
        stk_callback.get("CheckoutRequestID")
    )

    result_code = (
        stk_callback.get("ResultCode")
    )

    result_desc = (
        stk_callback.get("ResultDesc")
    )

    if not checkout_request_id:
        return Response(
            {
                "ResultCode": 0,
                "ResultDesc": "Accepted"
            }
        )

    try:

        payment = Transaction.objects.get(
            checkout_request_id=checkout_request_id
        )

    except Transaction.DoesNotExist:

        return Response(
            {
                "ResultCode": 0,
                "ResultDesc": "Accepted"
            }
        )

    # Idempotency:
    # If the payment has already been finalized,
    # don't process it again.

    if payment.status in [
        Transaction.StatusChoices.SUCCESSFUL,
        Transaction.StatusChoices.FAILED,
    ]:
        return Response(
            {
                "ResultCode": 0,
                "ResultDesc": "Accepted"
            }
        )

    if result_code == 0:

        payment.status = (
            Transaction.StatusChoices.SUCCESSFUL
        )

        payment.result_description = result_desc

        metadata = (
            stk_callback
            .get("CallbackMetadata", {})
            .get("Item", [])
        )

        for item in metadata:

            if item.get("Name") == "MpesaReceiptNumber":

                payment.mpesa_receipt_number = (
                    item.get("Value")
                )

                break

    else:

        payment.status = (
            Transaction.StatusChoices.FAILED
        )

        payment.result_description = result_desc

    payment.save()

    return Response(
        {
            "ResultCode": 0,
            "ResultDesc": "Accepted"
        }
    )