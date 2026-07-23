from django.shortcuts import render
from rest_framework import viewsets
from .models import Enrollment
from .serializers import EnrollmentSerializer

# Create your views here.
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer