from __future__ import annotations

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .routers import routes


urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/", include(("config.routers", "config"), namespace="config-api")
    ),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/dashboard/", include("dashboard.urls")),  
]

urlpatterns += routes.urls
