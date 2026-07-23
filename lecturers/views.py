from django.shortcuts import render
from rest_framework import viewsets
from .models import Lecturer
from .serializers import LecturerSerializer

# Create your views here.
class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer