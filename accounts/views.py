from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .models import Profile
from .serializers import (
    UserSerializer,
    AdminUserCreateSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            profile = user.profile
            role = profile.role
            phone = profile.phone
        except Profile.DoesNotExist:
            role = None
            phone = None

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": role,
            "phone": phone,
        })


class AdminUserCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not hasattr(request.user, "profile"):
            return Response(
                {"error": "User profile not found."},
                status=status.HTTP_403_FORBIDDEN
            )

        if request.user.profile.role != "Admin":
            return Response(
                {"error": "Only Admin can create users."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = AdminUserCreateSerializer(
            data=request.data
        )

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "User created successfully.",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    }
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )