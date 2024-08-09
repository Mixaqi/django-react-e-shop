from __future__ import annotations

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from authentication.routers import routes
from authentication.urls import urlpatterns as authentication_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/products/", include("products.urls")),
    path("api/auth/routes/", include(routes.urls)),
    path("api/auth/urls/", include(authentication_urls)),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
