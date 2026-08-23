from django.db import models
from students.models import Student
# Create your models here.

class Transaction(models.Model):

    class StatusChoices(models.TextChoices):
        PENDING = "PENDING", "Pending"
        SUCCESSFUL = "SUCCESSFUL", "Successful"
        FAILED = "FAILED", "Failed"

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    phone_number = models.CharField(
        max_length=15
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    reference = models.CharField(
        max_length=50,
        unique=True
    )

    merchant_request_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        db_index=True
    )

    checkout_request_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        db_index=True
    )

    mpesa_receipt_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=12,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )

    result_description = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.reference} - "
            f"{self.student} - "
            f"{self.status}"
        )