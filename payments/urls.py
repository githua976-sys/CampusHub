from django.urls import path

from .views import (
    PaymentListView,
    InitiatePaymentView,
    PaymentStatusView,
    mpesa_callback_view,
)

urlpatterns = [
    path(
        "",
        PaymentListView.as_view(),
        name="payment-list",
    ),
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