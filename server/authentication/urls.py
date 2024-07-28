from __future__ import annotations

from django.urls import path

from authentication.email_verification import resend_verification_email, verify_email
from authentication.views import PasswordResetViewSet

app_name = "authentication"
urlpatterns = [
    path(
        "verify-email/<int:user_id>/<str:token>/",
        verify_email,
        name="verify_email",
    ),
    path(
        "resend_verification/",
        resend_verification_email,
        name="resend_verification_email",
    ),
    path(
        "reset_password/",
        PasswordResetViewSet.as_view({"post": "reset_password"}),
        name="reset_password",
    ),
    path(
        "reset_password/confirm/",
        PasswordResetViewSet.as_view({"post": "confirm_reset_password"}),
        name="confirm-reset-password",
    ),
]
