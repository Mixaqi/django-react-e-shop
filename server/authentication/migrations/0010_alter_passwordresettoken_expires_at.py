# Generated by Django 5.0.2 on 2024-07-16 19:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0009_alter_passwordresettoken_expires_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="passwordresettoken",
            name="expires_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 7, 16, 20, 4, 15, 993870, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
