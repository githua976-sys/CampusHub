from rest_framework import serializers
from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.user.username",
        read_only=True
    )

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "student",
            "student_name",
            "course",
            "course_name",
            "enrolled_on"
        ]