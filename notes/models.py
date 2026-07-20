from django.db import models
from lecturers.models import Lecturer
from courses.models import Course

# Create your models here.
class Note(models.Model):

    title = models.CharField(max_length=200)

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    lecturer = models.ForeignKey(
        Lecturer,
        on_delete=models.CASCADE
    )

    file = models.FileField(upload_to='notes/')

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title