from __future__ import annotations

from typing import Any, ClassVar, Union

from django.db.models.query import QuerySet
from rest_framework import filters, status, viewsets
from rest_framework.exceptions import APIException
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from authentication.email_verification import send_verification_email
from authentication.models import User
from authentication.serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)


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
