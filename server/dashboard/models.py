from __future__ import annotations

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from typing import Any

from authentication.models import User


class Dashboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    image = models.URLField(max_length=200, blank=True, null=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @receiver(post_save, sender=User)
    def create_profile(sender: Any, instance: User, created: bool, **kwargs: Any) -> None:
        if created:
            Dashboard.objects.create(user=instance)

    def __str__(self) -> str:
        return f"{self.user} {self.full_name}"
