from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = [
            "id",
            "student",
            "phone_number",
            "amount",
            "reference",
            "merchant_request_id",
            "checkout_request_id",
            "mpesa_receipt_number",
            "status",
            "result_description",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "student",
            "reference",
            "merchant_request_id",
            "checkout_request_id",
            "mpesa_receipt_number",
            "status",
            "result_description",
            "created_at",
            "updated_at",
        ]