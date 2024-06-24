from __future__ import annotations

from dashboard.models import Dashboard
from rest_framework import serializers


class DashboardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Dashboard
        fields = ["user", "full_name", "image"]
