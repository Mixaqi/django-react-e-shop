# Generated by Django 5.0.2 on 2024-07-13 22:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0006_passwordresettoken"),
    ]

    operations = [
        migrations.AlterField(
            model_name="passwordresettoken",
            name="expires_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 7, 13, 23, 47, 14, 381092, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="passwordresettoken",
            name="token",
            field=models.CharField(
                default="c3p40k4k2aUNCOBq2Oqs0lAL6fE3Ev5k", max_length=100, unique=True
            ),
        ),
        migrations.AlterModelTable(
            name="passwordresettoken",
            table="password_reset_token",
        ),
    ]
