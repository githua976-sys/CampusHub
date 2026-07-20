from django.db import models
from django.contrib.auth.models import User
from departments.models import Department

# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    registration_number = models.CharField(
        max_length=30,
        unique=True
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user.username