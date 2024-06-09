# Generated by Django 5.0.2 on 2024-06-01 17:13

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dashboard", "0003_remove_dashboard_image_url_dashboard_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="dashboard",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="dashboard",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]