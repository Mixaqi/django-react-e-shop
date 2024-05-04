from __future__ import annotations

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from authentication.models import User


class Dashboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    # image
    verified = models.BooleanField(default=False)

    @receiver(post_save, sender=User)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Dashboard.objects.create(user=instance)

    def __str__(self) -> str:
        return f"{self.user} {self.full_name}"
