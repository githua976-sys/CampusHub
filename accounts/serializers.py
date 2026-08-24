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

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "role",
        ]

    def create(self, validated_data):
        role = validated_data.pop("role")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        Profile.objects.create(
            user=user,
            role=role
        )

        return user