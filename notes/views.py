
from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    SAFE_METHODS,
    BasePermission,
)
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Note
from .serializers import NoteSerializer


class NotePermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        # All authenticated users, including Students, can view notes.
        if request.method in SAFE_METHODS:
            return True

        # Only Admins and Lecturers can manage notes.
        profile = getattr(request.user, "profile", None)
        role = getattr(profile, "role", None)

        return role in ["Admin", "Lecturer"] or request.user.is_staff


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, NotePermission]
    parser_classes = (MultiPartParser, FormParser)
