from __future__ import annotations

import uuid
from typing import ClassVar

from django.db import models
from django.utils.text import slugify

from config.enums import ChoiceEnum


class OrderStatus(ChoiceEnum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    COMPLETED = "completed"
    CANCELED = "canceled"
    RETURNED = "returned"
    REFUNDED = "refunded"


class PaymentMethod(ChoiceEnum):
    CASH = "cash"
    CARD = "card"


class ProductCategory(models.Model):
    title = models.CharField(db_index=True, max_length=50)

    class Meta:
        db_table = "product_categories"

    def __str__(self) -> str:
        return self.title


def product_image_upload_to(instance: Product, filename: str) -> str:
    product_type = instance.__class__.__name__.lower()
    return f"products/{product_type}/{filename}"


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(db_index=True, max_length=255)
    available_in_stock = models.PositiveIntegerField(default=0)
    description = models.TextField()
    price = models.FloatField()
    slug = models.SlugField(max_length=255, unique=True)
    image = models.ImageField(
        upload_to=product_image_upload_to,
        blank=True,
        null=True,
        default="Unknown",
    )
    brand = models.CharField(max_length=50, default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

    class Meta:
        db_table = "products"
        verbose_name = "product"
        verbose_name_plural = "products"

    def __str__(self) -> str:
        return f"{self.title} {self.price}"

    def save(self, *args, **kwargs) -> None:
        if not self.pk and not self.category_id:
            self.category = self.get_default_category()
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_default_category(self) -> ProductCategory:
        raise NotImplementedError

    def is_available(self) -> bool:
        return self.available_in_stock > 0


class GraphicsCard(Product):
    ram_size_gb = models.PositiveIntegerField()
    memory_speed_mhz = models.PositiveIntegerField()
    gpu_clock_speed_mhz = models.PositiveIntegerField()
    card_interface = models.CharField(max_length=20)
    max_screen_resolution = models.CharField(max_length=20)
    required_power_supply = models.PositiveIntegerField()

    class Meta:
        db_table = "graphics_cards"

    def get_default_category(self) -> ProductCategory:
        try:
            return ProductCategory.objects.get(title="GPU")
        except ProductCategory.DoesNotExist:
            raise ValueError("Default category 'GPU' does not exist.")


class CPU(Product):
    clock_frequency_ghz = models.FloatField()
    turbo_clock_frequency_ghz = models.FloatField()
    supported_ram_frequency_mhz = models.PositiveIntegerField()
    is_boxed_version = models.BooleanField()
    socket = models.CharField(max_length=50)
    tdp_watt = models.PositiveIntegerField()
    l3_cache_mb = models.PositiveIntegerField()
    l2_cache_mb = models.PositiveIntegerField()
    number_of_cores = models.PositiveIntegerField()
    number_of_threads = models.PositiveIntegerField()
    techprocess_in_nm = models.PositiveIntegerField()

    class Meta:
        db_table = "processors"


class SSD(Product):
    has_heatsink = models.BooleanField()
    flash_chip_type = models.CharField(max_length=50)
    sequential_write_speed_mb_in_sec = models.PositiveIntegerField()
    sequential_read_speed_mb_in_sec = models.PositiveIntegerField()
    interface_type = models.CharField(max_length=20)
    is_compatible_with_ps5 = models.BooleanField()
    volume_in_gb = models.PositiveIntegerField()
    form_factor = models.CharField(max_length=15)

    class Meta:
        db_table = "ssds"


class HDD(Product):
    shock_resistance_during_storage_g = models.PositiveIntegerField()
    shock_resistance_during_operation_g = models.PositiveIntegerField()
    rotational_speed_rpm = models.PositiveIntegerField()
    noise_level_db = models.PositiveIntegerField()
    buffer_volume_mb = models.PositiveIntegerField()
    mtbf_hours = models.PositiveIntegerField()
    volume_in_gb = models.PositiveIntegerField()
    form_factor = models.CharField(max_length=20)

    class Meta:
        db_table = "hdds"


class PSU(Product):
    maximum_current_along_the_plus_12v_line = models.FloatField()
    has_cpu_8_pin = models.BooleanField()
    has_cpu_4_pin = models.BooleanField()
    has_pcie_8_pin = models.BooleanField()
    has_pcie_6_pin = models.BooleanField()
    number_of_separate_12v_lines = models.PositiveIntegerField()
    max_input_voltage_rage = models.PositiveIntegerField()
    min_input_voltage_rage = models.PositiveIntegerField()
    is_modular = models.BooleanField()
    fan_diameter_in_mm = models.PositiveIntegerField()
    power_w = models.PositiveIntegerField()

    class Meta:
        db_table = "psus"


class RAM(Product):
    RANK_SINGLE: ClassVar[int] = 1
    RANK_DUAL: ClassVar[int] = 2

    RANK_CHOICES: ClassVar[list[tuple[int, str]]] = [
        (RANK_SINGLE, "Single Rank"),
        (RANK_DUAL, "Dual Rank"),
    ]

    MODULES_ONE: ClassVar[int] = 1
    MODULES_TWO: ClassVar[int] = 2
    MODULES_FOUR: ClassVar[int] = 4

    MODULES_CHOICES: ClassVar[list[tuple[int, str]]] = [
        (MODULES_ONE, "1 Module"),
        (MODULES_TWO, "2 Modules"),
        (MODULES_FOUR, "4 Modules"),
    ]

    ranks_number = models.PositiveIntegerField(choices=RANK_CHOICES, null=True)
    volume_in_gb = models.PositiveIntegerField()
    has_heatsink = models.BooleanField()
    CL = models.PositiveIntegerField()
    modules_number = models.PositiveIntegerField(choices=MODULES_CHOICES, null=True)
    timings = models.CharField(max_length=16)
    clock_frequency_mhz = models.IntegerField()

    class Meta:
        db_table = "rams"


class Motherboard(Product):
    INTEL: ClassVar[str] = "Intel"
    AMD: ClassVar[str] = "AMD"

    PROCESSORS_CHOICES: ClassVar[list[tuple[str, str]]] = [
        (INTEL, "Intel"),
        (AMD, "AMD"),
    ]

    has_liquid_cooling_connector = models.BooleanField()
    processor_manufacturer = models.CharField(choices=PROCESSORS_CHOICES)
    socket = models.CharField(max_length=20)
    chipset = models.CharField(max_length=16)
    is_dual_channel = models.BooleanField()
    is_four_channel = models.BooleanField()
    max_memory_frequency_mhz = models.PositiveIntegerField()
    memory_type = models.CharField(max_length=20)
    max_memory_capacity_gb = models.PositiveIntegerField()
    ram_slots_number = models.PositiveIntegerField()

    class Meta:
        db_table = "motherboards"


class Cooling(Product):
    supported_sockets = models.JSONField(default=list, blank=True)
    connector_type_pin = models.PositiveIntegerField()
    fans_number = models.PositiveIntegerField()
    heat_pipe_number = models.PositiveIntegerField()
    db_max_noise_level = models.FloatField()
    fan_diameter_mm = models.PositiveIntegerField()
    max_power_dissipation_w = models.PositiveIntegerField()

    class Meta:
        db_table = "coolings"


class Case(Product):
    slots_2dot5_number = models.PositiveIntegerField()
    max_cpu_cooler_length_mm = models.PositiveIntegerField()
    max_gpu_length_mm = models.PositiveBigIntegerField()
    color = models.CharField(max_length=30)
    material = models.CharField(max_length=50)

    class Meta:
        db_table = "cases"


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_sum = models.FloatField(default=0)
    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices(),
        default=OrderStatus.PENDING.value,
    )
    shipping_address = models.TextField()
    payment_method = models.CharField(max_length=4, choices=PaymentMethod.choices())
    discount = models.FloatField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    products = models.ManyToManyField(Product)

    class Meta:
        db_table = "orders"

    def __str__(self) -> str:
        return f"{self.id} {self.total_sum} {self.created_at}"
