from __future__ import annotations

from django.urls import path

from authentication.email_verification import resend_verification_email, verify_email
from authentication.views import ResetPasswordViewSet

app_name = "authentication"
urlpatterns = [
    path(
        "reset_password/verify/",
        ResetPasswordViewSet.as_view({"post": "verify_reset_code"}),
        name="verify_reset_code",
    ),
    path(
        "reset_password/",
        ResetPasswordViewSet.as_view({"post": "create"}),
        name="reset_password",
    ),
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
]
