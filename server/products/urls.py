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
router.register(r"graphics_cards", GraphicsCardViewSet, basename="graphicscard")
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
    path(
        "graphics_cards/slug/<slug:slug>/",
        GraphicsCardViewSet.as_view({"get": "retrieve_by_slug"}),
        name="graphicscard-by-slug",
    ),
    path(
        "cpu/slug/<slug:slug>/",
        CPUViewSet.as_view({"get": "retrieve_by_slug"}),
        name="cpu-by-slug",
    ),
    path(
        "ssd/slug/<slug:slug>/",
        SSDViewSet.as_view({"get": "retrieve_by_slug"}),
        name="ssd-by-slug",
    ),
    path(
        "hdd/slug/<slug:slug>/",
        HDDViewSet.as_view({"get": "retrieve_by_slug"}),
        name="hdd-by-slug",
    ),
    path(
        "psu/slug/<slug:slug>/",
        PSUViewSet.as_view({"get": "retrieve_by_slug"}),
        name="psu-by-slug",
    ),
    path(
        "ram/slug/<slug:slug>/",
        RAMViewSet.as_view({"get": "retrieve_by_slug"}),
        name="ram-by-slug",
    ),
    path(
        "motherboards/slug/<slug:slug>/",
        MotherboardViewSet.as_view({"get": "retrieve_by_slug"}),
        name="motherboard-by-slug",
    ),
    path(
        "cooling/slug/<slug:slug>/",
        CoolingViewSet.as_view({"get": "retrieve_by_slug"}),
        name="cooling-by-slug",
    ),
    path(
        "cases/slug/<slug:slug>/",
        CaseViewSet.as_view({"get": "retrieve_by_slug"}),
        name="case-by-slug",
    ),
]
