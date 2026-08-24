from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
        ]

    def get_role(self, obj):
        try:
            return obj.profile.role
        except Profile.DoesNotExist:
            return None

    def get_phone(self, obj):
        try:
            return obj.profile.phone
        except Profile.DoesNotExist:
            return None

class AdminUserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    role = serializers.ChoiceField(
        choices=Profile.ROLE_CHOICES
    )

    registration_number = serializers.CharField(
        required=False
    )

    department = serializers.IntegerField(
        required=False
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "role",
            "registration_number",
            "department",
        ]

    def create(self, validated_data):
        role = validated_data.pop("role")
        password = validated_data.pop("password")

        registration_number = validated_data.pop(
            "registration_number",
            None
        )

        department_id = validated_data.pop(
            "department",
            None
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        Profile.objects.create(
            user=user,
            role=role
        )

        if role == "Student":

            if not registration_number:
                raise serializers.ValidationError({
                    "registration_number":
                        "Registration number is required for students."
                })

            if not department_id:
                raise serializers.ValidationError({
                    "department":
                        "Department is required for students."
                })

            from departments.models import Department
            from students.models import Student

            department = Department.objects.get(
                id=department_id
            )

            Student.objects.create(
                user=user,
                registration_number=registration_number,
                department=department
            )

        return user