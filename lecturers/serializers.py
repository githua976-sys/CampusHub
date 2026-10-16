from rest_framework import serializers
from .models import Lecturer


class LecturerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    class Meta:
        model = Lecturer
        fields = [
            "id",
            "user",
            "username",
            "employee_number",
            "department",
            "department_name",
        ]