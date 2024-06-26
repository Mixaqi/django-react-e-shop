from __future__ import annotations

from rest_framework import serializers

from dashboard.models import Dashboard


class DashboardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Dashboard
        fields = ["user", "full_name", "image"]
