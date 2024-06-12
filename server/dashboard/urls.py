from django.urls import path
from .views import DashboardViewSet


app_name = "dashboard"
urlpatterns = [
    path(
        "<int:id>/",
        DashboardViewSet.as_view({"get": "retrieve", "patch": "partial_update"}),
        name="dashboard-detail",
    ),
    path(
        "upload-image/<int:id>/",
        DashboardViewSet.as_view({"post": "upload_image"}),
        name="dashboard-upload-image",
    ),
]
