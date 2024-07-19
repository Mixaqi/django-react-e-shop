from __future__ import annotations

from datetime import timedelta
from secrets import token_urlsafe
from typing import ClassVar

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(
        self,
        username: str,
        email: str,
        password=None,
        **kwargs,
    ) -> type[User]:
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self,
        username: str,
        email: str,
        password: str,
    ) -> type[User]:
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255)
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: ClassVar[list] = ["username"]

    objects = UserManager()

    def __str__(self) -> str:
        return f"{self.email}"


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = "password_reset_token"

    def __str__(self) -> str:
        return f"{self.user} {self.token} {self.created_at} {self.expires_at}"

    def save(self, *args, **kwargs) -> None:
        if not self.token:
            self.token = self.generate_unique_token()
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=10)
        super().save(*args, **kwargs)

    def generate_unique_token(self) -> str:
        while True:
            token = token_urlsafe(32)
            if not PasswordResetToken.objects.filter(token=token).exists():
                return token

    def is_valid(self) -> bool:
        return self.expires_at > timezone.now()
