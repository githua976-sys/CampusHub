from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MeView
from .views import AdminUserCreateView

router = DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("me/", MeView.as_view()),
     path(
        "users/create/",
        AdminUserCreateView.as_view(),
        name="admin-user-create"
    ),
]