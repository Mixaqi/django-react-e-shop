from __future__ import annotations

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from authentication.models import User


class TestAuthentication:
    @staticmethod
    @pytest.fixture()
    def api_client() -> APIClient:
        return APIClient()

    @pytest.mark.django_db()
    @pytest.mark.parametrize("username, email, password, expected_status", [
        ("TypicalUserName@@$../n", "correctemailaddress@mail.ru", "typicalPassword", status.HTTP_201_CREATED),
        ("None", "correctemailaddress@mail.ru", "typicalPassword", status.HTTP_201_CREATED),
        ("ValidUsername", "invalidemail", "typicalPassword", status.HTTP_400_BAD_REQUEST),
        ("ValidUsername", "correctemailaddress@mail.ru", "short", status.HTTP_400_BAD_REQUEST),
    ])
    def test_create_user(self, api_client: APIClient, username: str, email: str, password: str, expected_status) -> None:
        data = {
            "username": username,
            "email": email,
            "password": password,
        }

        response = api_client.post("/api/auth/routes/register/", data, format="json")
        assert response.status_code == expected_status
        if expected_status == status.HTTP_201_CREATED:
            user = User.objects.get(username=username)
            assert user.email == email
            assert user.username == username
            assert "password" not in response.data
