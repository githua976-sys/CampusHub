import base64
from datetime import datetime

import requests
from django.conf import settings


class MpesaService:

    def __init__(self):

        if settings.MPESA_ENVIRONMENT == "production":
            self.base_url = "https://api.safaricom.co.ke"
        else:
            self.base_url = "https://sandbox.safaricom.co.ke"

    def get_access_token(self):

        print(
            "KEY EXISTS:",
            bool(settings.MPESA_CONSUMER_KEY)
        )

        print(
            "SECRET EXISTS:",
            bool(settings.MPESA_CONSUMER_SECRET)
        )

        url = f"{self.base_url}/oauth/v1/generate"

        response = requests.get(
            url,
            params={
                "grant_type": "client_credentials"
            },
            auth=(
                settings.MPESA_CONSUMER_KEY,
                settings.MPESA_CONSUMER_SECRET,
            ),
            timeout=15,
        )

        print(
            "MPESA OAUTH STATUS:",
            response.status_code
        )

        print(
            "MPESA OAUTH RESPONSE:",
            response.text
        )

        response.raise_for_status()

        data = response.json()

        access_token = data.get("access_token")

        if not access_token:
            raise Exception(
                f"Safaricom did not return an access token: {data}"
            )

        return access_token

    @staticmethod
    def generate_password(timestamp):

        data_to_encode = (
            f"{settings.MPESA_EXPRESS_SHORTCODE}"
            f"{settings.MPESA_PASSKEY}"
            f"{timestamp}"
        )

        return base64.b64encode(
            data_to_encode.encode()
        ).decode("utf-8")

    def initiate_stk_push(
        self,
        phone_number,
        amount,
        account_reference,
        transaction_desc,
    ):

        access_token = self.get_access_token()

        timestamp = datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        password = self.generate_password(timestamp)

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        formatted_phone = (
            phone_number
            .replace("+", "")
            .strip()
        )

        if formatted_phone.startswith("0"):
            formatted_phone = (
                f"254{formatted_phone[1:]}"
            )

        payload = {
            "BusinessShortCode":
                settings.MPESA_EXPRESS_SHORTCODE,

            "Password":
                password,

            "Timestamp":
                timestamp,

            "TransactionType":
                "CustomerPayBillOnline",

            "Amount":
                int(amount),

            "PartyA":
                formatted_phone,

            "PartyB":
                settings.MPESA_EXPRESS_SHORTCODE,

            "PhoneNumber":
                formatted_phone,

            "CallBackURL":
                settings.MPESA_CALLBACK_URL,

            "AccountReference":
                account_reference,

            "TransactionDesc":
                transaction_desc,
        }

        url = (
            f"{self.base_url}"
            "/mpesa/stkpush/v1/processrequest"
        )

        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=15,
        )

        response.raise_for_status()

        return response.json()