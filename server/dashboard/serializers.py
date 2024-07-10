from __future__ import annotations

from typing import ClassVar

from rest_framework import serializers

from dashboard.models import Dashboard


class DashboardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Dashboard
        fields: ClassVar[list] = ["user", "full_name", "image"]
