import base64
from datetime import datetime

import requests
from django.conf import settings


class MpesaService:
    """
    Handles communication with the Safaricom M-Pesa Daraja API.
    """

    def __init__(self):
        # Select M-Pesa environment
        if settings.MPESA_ENVIRONMENT.lower() == "production":
            self.base_url = "https://api.safaricom.co.ke"
        else:
            self.base_url = "https://sandbox.safaricom.co.ke"

    # ---------------------------------------------------------
    # GET ACCESS TOKEN
    # ---------------------------------------------------------
    def get_access_token(self):
        """
        Generate an OAuth access token from Safaricom.
        """

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

        print("================================")
        print("MPESA OAUTH STATUS:", response.status_code)
        print("MPESA OAUTH RESPONSE:", response.text)
        print("================================")

        response.raise_for_status()

        data = response.json()

        access_token = data.get("access_token")

        if not access_token:
            raise Exception(
                f"Safaricom did not return an access token: {data}"
            )

        return access_token

    # ---------------------------------------------------------
    # GENERATE STK PASSWORD
    # ---------------------------------------------------------
    @staticmethod
    def generate_password(timestamp):
        """
        Generate the Base64 encoded password required
        by the M-Pesa STK Push API.

        Password =
        Base64(
            BusinessShortCode + Passkey + Timestamp
        )
        """

        data_to_encode = (
            f"{settings.MPESA_EXPRESS_SHORTCODE}"
            f"{settings.MPESA_PASSKEY}"
            f"{timestamp}"
        )

        password = base64.b64encode(
            data_to_encode.encode("utf-8")
        ).decode("utf-8")

        return password

    # ---------------------------------------------------------
    # FORMAT PHONE NUMBER
    # ---------------------------------------------------------
    @staticmethod
    def format_phone_number(phone_number):
        """
        Convert Kenyan phone numbers into 254XXXXXXXXX format.

        Examples:

        0712345678   -> 254712345678
        +254712345678 -> 254712345678
        254712345678 -> 254712345678
        """

        if not phone_number:
            raise ValueError("Phone number is required.")

        # Convert to string
        phone_number = str(phone_number).strip()

        # Remove spaces and hyphens
        phone_number = phone_number.replace(" ", "")
        phone_number = phone_number.replace("-", "")

        # Remove +
        if phone_number.startswith("+"):
            phone_number = phone_number[1:]

        # Convert 07XXXXXXXX to 2547XXXXXXXX
        if phone_number.startswith("0"):
            phone_number = (
                "254" + phone_number[1:]
            )

        # Basic Kenyan number validation
        if not phone_number.startswith("254"):
            raise ValueError(
                "Invalid phone number. "
                "Use format 2547XXXXXXXX or 07XXXXXXXX."
            )

        if len(phone_number) != 12:
            raise ValueError(
                "Invalid Kenyan phone number. "
                "Expected 12 digits."
            )

        if not phone_number.isdigit():
            raise ValueError(
                "Phone number must contain digits only."
            )

        return phone_number

    # ---------------------------------------------------------
    # INITIATE STK PUSH
    # ---------------------------------------------------------
    def initiate_stk_push(
        self,
        phone_number,
        amount,
        account_reference,
        transaction_desc,
    ):
        """
        Initiate an M-Pesa STK Push request.
        """

        # ---------------------------------------------
        # 1. Get OAuth access token
        # ---------------------------------------------
        access_token = self.get_access_token()

        # ---------------------------------------------
        # 2. Generate timestamp
        # ---------------------------------------------
        timestamp = datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        # ---------------------------------------------
        # 3. Generate password
        # ---------------------------------------------
        password = self.generate_password(timestamp)

        # ---------------------------------------------
        # 4. Format phone number
        # ---------------------------------------------
        formatted_phone = self.format_phone_number(
            phone_number
        )

        # ---------------------------------------------
        # 5. Validate amount
        # ---------------------------------------------
        try:
            amount = int(amount)
        except (TypeError, ValueError):
            raise ValueError(
                "Amount must be a valid number."
            )

        if amount <= 0:
            raise ValueError(
                "Amount must be greater than zero."
            )

        # ---------------------------------------------
        # 6. Validate callback URL
        # ---------------------------------------------
        callback_url = settings.MPESA_CALLBACK_URL

        if not callback_url:
            raise ValueError(
                "MPESA_CALLBACK_URL is not configured."
            )

        # ---------------------------------------------
        # 7. Build STK Push payload
        # ---------------------------------------------
        payload = {
            "BusinessShortCode": (
                settings.MPESA_EXPRESS_SHORTCODE
            ),

            "Password": password,

            "Timestamp": timestamp,

            "TransactionType": (
                "CustomerPayBillOnline"
            ),

            "Amount": amount,

            "PartyA": formatted_phone,

            "PartyB": (
                settings.MPESA_EXPRESS_SHORTCODE
            ),

            "PhoneNumber": formatted_phone,

            "CallBackURL": callback_url,

            "AccountReference": account_reference,

            "TransactionDesc": transaction_desc,
        }

        # ---------------------------------------------
        # 8. STK Push URL
        # ---------------------------------------------
        url = (
            f"{self.base_url}"
            "/mpesa/stkpush/v1/processrequest"
        )

        # ---------------------------------------------
        # 9. Headers
        # ---------------------------------------------
        headers = {
            "Authorization": (
                f"Bearer {access_token}"
            ),
            "Content-Type": "application/json",
        }

        # ---------------------------------------------
        # 10. Send request
        # ---------------------------------------------
        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=15,
        )

        # ---------------------------------------------
        # 11. Debug information
        # ---------------------------------------------
        print("================================")
        print("MPESA STK PUSH")
        print("================================")
        print(
            "MPESA STK STATUS:",
            response.status_code
        )
        print(
            "MPESA STK RESPONSE:",
            response.text
        )
        print(
            "MPESA PHONE:",
            formatted_phone
        )
        print(
            "MPESA SHORTCODE:",
            settings.MPESA_EXPRESS_SHORTCODE
        )
        print(
            "MPESA CALLBACK:",
            callback_url
        )
        print("================================")

        # ---------------------------------------------
        # 12. Handle Safaricom errors
        # ---------------------------------------------
        if response.status_code != 200:
            raise Exception(
                f"M-Pesa STK Push failed "
                f"({response.status_code}): "
                f"{response.text}"
            )

        # ---------------------------------------------
        # 13. Parse response
        # ---------------------------------------------
        try:
            data = response.json()
        except ValueError:
            raise Exception(
                f"Invalid response from Safaricom: "
                f"{response.text}"
            )

        # ---------------------------------------------
        # 14. Return response to view
        # ---------------------------------------------
        return data