from __future__ import annotations

import pytest
from rest_framework.test import APIClient

from authentication.models import User


@pytest.fixture()
def api_client() -> APIClient:
    return APIClient()

@pytest.fixture()
def user() -> User:
    return User.objects.create(username="testuser", email="test@example.com")

@pytest.fixture()
def authenticated_api_client(user: User, api_client: APIClient) -> APIClient:
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)
