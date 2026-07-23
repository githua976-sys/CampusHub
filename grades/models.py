from django.db import models
from students.models import Student
from courses.models import Course

# Create your models here.
class Grade(models.Model):

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    score = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    grade = models.CharField(max_length=2)

    semester = models.CharField(max_length=20)

    academic_year = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.student} - {self.course}"