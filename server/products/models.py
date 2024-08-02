from __future__ import annotations

import uuid

from django.db import models
from django.db.models import JSONField

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
        return f"{self.title}"


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(db_index=True, max_length=255)
    available_in_stock = models.FloatField(default=0)
    description = models.TextField()
    price = models.FloatField()
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attributes = JSONField(default=dict)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

    class Meta:
        db_table = "products"
        verbose_name = "product"
        verbose_name_plural = "products"

    def __str__(self) -> str:
        return f"{self.title} {self.price} {self.attributes}"

    def is_available(self) -> bool:
        return self.available_in_stock > 0


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
