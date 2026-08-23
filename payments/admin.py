from django.contrib import admin
from .models import Transaction
# Register your models here.

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):

    list_display = (
        "reference",
        "student",
        "phone_number",
        "amount",
        "status",
        "mpesa_receipt_number",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "reference",
        "phone_number",
        "mpesa_receipt_number",
        "student__user__username",
    )