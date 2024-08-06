from __future__ import annotations

from typing import ClassVar

from django.contrib import admin

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
    ProductCategory,
)

admin.site.register(ProductCategory)


@admin.register(SSD)
class SSDAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(HDD)
class HDDAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(GraphicsCard)
class GPUAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(CPU)
class CPUAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(Cooling)
class CoolingAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(RAM)
class RAMAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(PSU)
class PSUAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]


@admin.register(Motherboard)
class MotherboardAdmin(admin.ModelAdmin):
    exclude: ClassVar[list] = ["slug", "category"]
