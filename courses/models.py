from django.db import models
from departments.models import Department

# Create your models here.

class Course(models.Model):
    course_code = models.CharField(max_length=20)
    course_name = models.CharField(max_length=100)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.course_name