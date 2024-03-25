from __future__ import annotations

from authentication.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from typing import Any


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_active", "created_at", "updated_at"]
        read_only_fields = ["is_active", "created_at", "updated_at"]


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["user"] = UserSerializer(self.user).data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        # if api_settings.UPDATE_LAST_LOGIN:
        update_last_login(None, self.user)
        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )
    email = serializers.EmailField(required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_active",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data: dict[str, Any]) -> type[User]:
        try:
            user = User.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
    
    # def create(self, validated_data: dict[str, Any])-> type[User]:
    #     email = validated_data.get('email')
    #     username = validated_data.get('username')
    #     errors = {}
    #     if User.objects.filter(email=email).exists():
    #         errors['email'] = 'User with this email already exists'
    #     if User.objects.filter(username=username).exists():
    #          errors['username'] = 'User with this username already exists'
             
    #     user = User.objects.create_user(**validated_data)
    #     return user
        
    
