from __future__ import annotations

from rest_framework import viewsets

from .mixins import RetrieveBySlugMixin
from .models import (
    CPU,
    HDD,
    PSU,
    RAM,
    SSD,
    Case,
    Cooling,
    GraphicsCard,
    Motherboard,
)
from .serializers import (
    CaseSerializer,
    CoolingSerializer,
    CPUSerializer,
    GraphicsCardSerializer,
    HDDSerializer,
    MotherboardSerializer,
    PSUSerializer,
    RAMSerializer,
    SSDSerializer,
)


class GraphicsCardViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = GraphicsCard.objects.all()
    serializer_class = GraphicsCardSerializer


class CPUViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer


class SSDViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = SSD.objects.all()
    serializer_class = SSDSerializer


class HDDViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = HDD.objects.all()
    serializer_class = HDDSerializer


class PSUViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = PSU.objects.all()
    serializer_class = PSUSerializer


class RAMViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = RAM.objects.all()
    serializer_class = RAMSerializer


class MotherboardViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = Motherboard.objects.all()
    serializer_class = MotherboardSerializer


class CoolingViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = Cooling.objects.all()
    serializer_class = CoolingSerializer


class CaseViewSet(RetrieveBySlugMixin, viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
