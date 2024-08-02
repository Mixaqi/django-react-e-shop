# Generated by Django 5.0.2 on 2024-08-02 13:49

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(db_index=True, max_length=255)),
                ("available_in_stock", models.FloatField(default=0)),
                ("description", models.TextField()),
                ("price", models.FloatField()),
                ("slug", models.SlugField(blank=True, max_length=255, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("attributes", models.JSONField(default=dict)),
            ],
            options={
                "verbose_name": "product",
                "verbose_name_plural": "products",
                "db_table": "products",
            },
        ),
        migrations.CreateModel(
            name="ProductCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(db_index=True, max_length=50)),
            ],
            options={
                "db_table": "product_categories",
            },
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("total_sum", models.FloatField(default=0)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "PENDING"),
                            ("processing", "PROCESSING"),
                            ("shipped", "SHIPPED"),
                            ("delivered", "DELIVERED"),
                            ("completed", "COMPLETED"),
                            ("canceled", "CANCELED"),
                            ("returned", "RETURNED"),
                            ("refunded", "REFUNDED"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("shipping_address", models.TextField()),
                (
                    "payment_method",
                    models.CharField(
                        choices=[("cash", "CASH"), ("card", "CARD")], max_length=4
                    ),
                ),
                ("discount", models.FloatField(default=0)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("products", models.ManyToManyField(to="products.product")),
            ],
            options={
                "db_table": "orders",
            },
        ),
        migrations.AddField(
            model_name="product",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="products.productcategory",
            ),
        ),
    ]
