from __future__ import annotations

from django.contrib import admin

from .models import User

admin.site.register(User)
