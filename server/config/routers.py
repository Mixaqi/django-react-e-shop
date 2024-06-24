from __future__ import annotations

from rest_framework.routers import SimpleRouter
from authentication.views import UserViewSet
from authentication.views import (
    LoginViewSet,
    RegistrationViewSet,
    RefreshViewSet,
)


routes = SimpleRouter()

routes.register(r"auth/login", LoginViewSet, basename="auth-login")
routes.register(r"auth/register", RegistrationViewSet, basename="auth-register")
routes.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")
routes.register(r"users", UserViewSet, basename="users")


urlpatterns = [*routes.urls]
