from __future__ import annotations

from rest_framework import serializers

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
    Product,
    ProductCategory,
)


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="title",
        queryset=ProductCategory.objects.all(),
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "available_in_stock",
            "description",
            "price",
            "slug",
            "image",
            "brand",
            "category",
        ]


class GraphicsCardSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = GraphicsCard
        fields = (
            *ProductSerializer.Meta.fields,
            "ram_size_gb",
            "memory_speed_mhz",
            "gpu_clock_speed_mhz",
            "card_interface",
            "max_screen_resolution",
            "required_power_supply",
        )


class CPUSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = CPU
        fields = (
            *ProductSerializer.Meta.fields,
            "clock_frequency_ghz",
            "turbo_clock_frequency_ghz",
            "supported_ram_frequency_mhz",
            "is_boxed_version",
            "socket",
            "tdp_watt",
            "l3_cache_mb",
            "l2_cache_mb",
            "number_of_cores",
            "number_of_threads",
            "techprocess_in_nm",
        )


class SSDSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = SSD
        fields = (
            *ProductSerializer.Meta.fields,
            "has_heatsink",
            "flash_chip_type",
            "sequential_write_speed_mb_in_sec",
            "sequential_read_speed_mb_in_sec",
            "interface_type",
            "is_compatible_with_ps5",
            "volume_in_gb",
            "form_factor",
        )


class HDDSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = HDD
        fields = (
            *ProductSerializer.Meta.fields,
            "shock_resistance_during_storage_g",
            "shock_resistance_during_operation_g",
            "rotational_speed_rpm",
            "noise_level_db",
            "buffer_volume_mb",
            "mtbf_hours",
            "volume_in_gb",
            "form_factor",
        )


class PSUSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = PSU
        fields = (
            *ProductSerializer.Meta.fields,
            "maximum_current_along_the_plus_12v_line",
            "has_cpu_8_pin",
            "has_cpu_4_pin",
            "has_pcie_8_pin",
            "has_pcie_6_pin",
            "number_of_separate_12v_lines",
            "max_input_voltage_rage",
            "min_input_voltage_rage",
            "is_modular",
            "fan_diameter_in_mm",
            "power_w",
        )


class RAMSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = RAM
        fields = (
            *ProductSerializer.Meta.fields,
            "ranks_number",
            "volume_in_gb",
            "has_heatsink",
            "CL",
            "modules_number",
            "timings",
            "clock_frequency_mhz",
        )


class MotherboardSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = Motherboard
        fields = (
            *ProductSerializer.Meta.fields,
            "has_liquid_cooling_connector",
            "processor_manufacturer",
            "socket",
            "chipset",
            "is_dual_channel",
            "is_four_channel",
            "max_memory_frequency_mhz",
            "memory_type",
            "max_memory_capacity_gb",
            "ram_slots_number",
        )


class CoolingSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = Cooling
        fields = (
            *ProductSerializer.Meta.fields,
            "supported_sockets",
            "connector_type_pin",
            "fans_number",
            "heat_pipe_number",
            "db_max_noise_level",
            "fan_diameter_mm",
            "max_power_dissipation_w",
        )


class CaseSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        model = Case
        fields = (
            *ProductSerializer.Meta.fields,
            "slots_2dot5_number",
            "max_cpu_cooler_length_mm",
            "max_gpu_length_mm",
            "color",
            "material",
        )
