from __future__ import annotations

from django.urls import path

from server.authentication.email_verification import verify_email

from .views import UserViewSet

app_name = "authentication"
urlpatterns = [
    path(
        "<int:pk>/",
        UserViewSet.as_view(
            {
                "get": "retrieve",
            },
        ),
        name="user-info",
    ),
]
