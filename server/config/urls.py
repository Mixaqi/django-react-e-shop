from __future__ import annotations

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from authentication.email_verification import resend_verification_email, verify_email

from .routers import routes

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(("config.routers", "config"), namespace="config-api")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path(
        "verify-email/<int:user_id>/<str:token>/",
        verify_email,
        name="verify_email",
    ),
    path("api/resend-verification/", resend_verification_email, name="resend_verification_email"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += routes.urls
