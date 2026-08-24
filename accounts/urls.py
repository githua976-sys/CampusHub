from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, MeView, AdminUserCreateView


router = DefaultRouter()
router.register("users", UserViewSet)


urlpatterns = [
    # Custom routes FIRST
    path(
        "users/create/",
        AdminUserCreateView.as_view(),
        name="admin-user-create"
    ),

    path(
        "me/",
        MeView.as_view()
    ),

    # Router routes LAST
    path(
        "",
        include(router.urls)
    ),
]