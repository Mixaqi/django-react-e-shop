from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CaseViewSet,
    CoolingViewSet,
    CPUViewSet,
    GraphicsCardViewSet,
    HDDViewSet,
    MotherboardViewSet,
    PSUViewSet,
    RAMViewSet,
    SSDViewSet,
)

router = DefaultRouter()
router.register(r"graphics-cards", GraphicsCardViewSet, basename="graphicscard")
router.register(r"cpu", CPUViewSet, basename="cpu")
router.register(r"ssd", SSDViewSet, basename="ssd")
router.register(r"hdd", HDDViewSet, basename="hdd")
router.register(r"psu", PSUViewSet, basename="psu")
router.register(r"ram", RAMViewSet, basename="ram")
router.register(r"motherboards", MotherboardViewSet, basename="motherboard")
router.register(r"cooling", CoolingViewSet, basename="cooling")
router.register(r"cases", CaseViewSet, basename="case")

urlpatterns = [
    path("", include(router.urls)),
]
