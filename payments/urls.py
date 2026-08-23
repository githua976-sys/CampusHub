from django.urls import path

from .views import (
    InitiatePaymentView,
    PaymentStatusView,
    mpesa_callback_view,
)


urlpatterns = [

    # Put callback BEFORE <str:reference>/
    path(
        "callback/",
        mpesa_callback_view,
        name="mpesa-callback",
    ),

    path(
        "initiate/",
        InitiatePaymentView.as_view(),
        name="payment-initiate",
    ),

    path(
        "<str:reference>/",
        PaymentStatusView.as_view(),
        name="payment-status",
    ),
]