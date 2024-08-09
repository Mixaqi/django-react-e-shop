from __future__ import annotations

from rest_framework import viewsets

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


class GraphicsCardViewSet(viewsets.ModelViewSet):
    queryset = GraphicsCard.objects.all()
    serializer_class = GraphicsCardSerializer


class CPUViewSet(viewsets.ModelViewSet):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer


class SSDViewSet(viewsets.ModelViewSet):
    queryset = SSD.objects.all()
    serializer_class = SSDSerializer


class HDDViewSet(viewsets.ModelViewSet):
    queryset = HDD.objects.all()
    serializer_class = HDDSerializer


class PSUViewSet(viewsets.ModelViewSet):
    queryset = PSU.objects.all()
    serializer_class = PSUSerializer


class RAMViewSet(viewsets.ModelViewSet):
    queryset = RAM.objects.all()
    serializer_class = RAMSerializer


class MotherboardViewSet(viewsets.ModelViewSet):
    queryset = Motherboard.objects.all()
    serializer_class = MotherboardSerializer


class CoolingViewSet(viewsets.ModelViewSet):
    queryset = Cooling.objects.all()
    serializer_class = CoolingSerializer


class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
