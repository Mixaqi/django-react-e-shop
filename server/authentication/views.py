from __future__ import annotations

from typing import ClassVar

from django.core.mail import send_mail
from django.db.models.query import QuerySet
from django.utils.crypto import get_random_string
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from authentication.email_verification import send_verification_email
from authentication.models import PasswordResetToken, User
from authentication.serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)
from config.settings import EMAIL_HOST_USER


class UserViewSet(viewsets.ModelViewSet):
    http_method_names: ClassVar[list[str]] = ["get"]
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends: ClassVar[list[type]] = [filters.OrderingFilter]
    ordering_fields: ClassVar[list[str]] = ["updated_at"]
    ordering: ClassVar[list[str]] = ["-updated_at"]

    def get_queryset(self) -> QuerySet[User]:
        queryset = User.objects.values("id", "username", "email", "is_verified", "created_at")
        if not self.request.user.is_superuser:
            queryset = queryset.filter(id=self.request.user.id)
        return queryset

    def list(self, request: Request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(self.get_queryset())
        if queryset.exists():
            user = queryset.first()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names: ClassVar[list[str]] = ["post"]

    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise APIException(detail=str(e)) from e
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names: ClassVar[list[str]] = ["post"]

    def create(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_verification_email(user)
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return Response(
            {
                "user": serializer.data,
                "refresh": res["refresh"],
                "access": res["access"],
            },
            status=status.HTTP_201_CREATED,
        )


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names: ClassVar[list[str]] = ["post"]

    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0]) from e
        except Exception as e:
            raise APIException from e
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class PasswordResetViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    @action(detail=False, methods=["post"], url_path="reset")
    def reset_password(self, request: Request) -> Response:
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        reset_token = PasswordResetToken.objects.create(user=user)
        reset_link = f"{request.build_absolute_uri('/api/auth/urls/reset_password/confirm/')}?token={reset_token.token}"
        send_mail(
            "Password Reset Request",
            f"Click the link to reset your password: {reset_link}",
            EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response(
            {"success": "A password reset link has been sent to your email"},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["post"], url_path="confirm")
    def confirm_reset_password(self, request: Request) -> Response:
        token = request.query_params.get("token")
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reset_token = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_404_NOT_FOUND)

        if not reset_token.is_valid():
            return Response({"error": "Token has expired"}, status=status.HTTP_400_BAD_REQUEST)

        new_password = get_random_string(length=10)
        user = reset_token.user
        user.set_password(new_password)
        user.save()
        reset_token.delete()

        send_mail(
            "Your new password",
            f"Your new password is: {new_password}",
            EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response(
            {"success": "Your new password has been sent to your email"},
            status=status.HTTP_200_OK,
        )
