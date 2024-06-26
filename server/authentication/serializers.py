from __future__ import annotations

from typing import Any

from django.contrib.auth.models import update_last_login
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["is_active", "created_at", "updated_at"]


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["user"] = UserSerializer(self.user).data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        update_last_login(None, self.user)
        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
        required=True,
    )
    email = serializers.EmailField(
        required=True,
        max_length=128,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data: dict[str, Any]) -> type[User]:
        try:
            user = User.objects.create_user(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {"email": "This email is already taken."},
            )
        return user
