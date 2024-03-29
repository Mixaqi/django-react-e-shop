from __future__ import annotations

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(('config.routers', 'config'), namespace='config-api')),
]
