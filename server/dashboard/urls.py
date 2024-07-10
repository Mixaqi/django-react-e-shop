from __future__ import annotations

from django.urls import path

from .views import DashboardViewSet

app_name = "dashboard"
urlpatterns = [
    path(
        "me/",
        DashboardViewSet.as_view({"get": "retrieve"}),
        name="dashboard-detail",
    ),
    path(
        "update-user-data/",
        DashboardViewSet.as_view({"patch": "partial_update"}),
        name="dashboard-user-data",
    ),
    path(
        "upload-image/",
        DashboardViewSet.as_view({"post": "upload_image"}),
        name="dashboard-upload-image",
    ),
    path(
        "delete-image/",
        DashboardViewSet.as_view({"post": "delete_image"}),
        name="dashboard-delete-image",
    ),
]
