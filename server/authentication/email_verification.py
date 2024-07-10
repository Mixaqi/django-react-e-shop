from __future__ import annotations

import os

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.models import User
from config.settings import EMAIL_HOST_USER, logger

load_dotenv()


def send_verification_email(user: User) -> None:
    token = default_token_generator.make_token(user)
    verification_link = f"{os.environ.get('HOST_1')}verify-email/{user.pk}/{token}/"
    subject = "Verify your email address"
    message = f"Hi {user.username}, \nPlease click the link below to verify your email address:\n{verification_link}"
    send_mail(
        subject,
        message,
        EMAIL_HOST_USER,
        [user.email],
        fail_silently=True,
    )


@api_view(["POST"])
def verify_email(user_id: int, token: str) -> Response:
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        logger.error("User not found")
        return Response({"error": "User not found"}, status=404)

    if user.is_verified:
        logger.error("Verification link already used")
        return Response(
            {"error": "Verification link has already been used or token has expired"},
            status=400,
        )

    if default_token_generator.check_token(user, token):
        user.is_verified = True
        user.save()
        logger.info("User updated successfully")
        return Response({"message": "Email verified successfully"}, status=200)

    logger.error("Invalid token")
    return Response({"error": "Token is invalid"}, status=400)


@api_view(["POST"])
def resend_verification_email(request: Request) -> Response:
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"detail": "User is not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        if user.is_verified:
            return Response(
                {"detail": "User is already verified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        send_verification_email(user)
        return Response(
            {"detail": "Verification email sent"},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        logger.error(f"Failed to resend verification email: {e}")
        return Response(
            {"detail": "Failed to resend verification email"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
