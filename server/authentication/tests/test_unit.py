from __future__ import annotations

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from authentication.email_verification import default_token_generator
from authentication.models import User


class TestAuthentication:
    @pytest.mark.django_db()
    @pytest.mark.parametrize("username, email, password, expected_status", [
        ("TypicalUserName@@$../n", "correctemailaddress@mail.ru", "typicalPassword", status.HTTP_201_CREATED),
        ("None", "correctemailaddress@mail.ru", "typicalPassword", status.HTTP_201_CREATED),
        ("TESTBASEORNOT-username", "invalidemail", "typicalPassword", status.HTTP_400_BAD_REQUEST),
        ("ValidUsername", "correctemailaddress@mail.ru", "short", status.HTTP_400_BAD_REQUEST),
        ("90symbolss" * 9, "correctmail@mail.ru", "correctPassword1234", status.HTTP_400_BAD_REQUEST),
    ])
    def test_create_user(self, api_client: APIClient, username: str, email: str, password: str, expected_status: int) -> None:
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

    @pytest.mark.django_db()
    def test_verify_email(self, api_client: APIClient, user: User ) -> None:
        token = default_token_generator.make_token(user)
        url = reverse("verify_email", args=[user.pk, token])
        response = api_client.post(url)
        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.is_verified is True

        response = api_client.post(url)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "Verification link has already been used or token has expired" in response.data["error"]

        invalid_url = reverse("verify_email", args=[user.pk + 1, token])
        response = api_client.post(invalid_url)
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "User not found" in response.data["error"]


    @pytest.mark.django_db()
    @pytest.mark.parametrize("client_type", [
    "api_client",
    "authenticated_api_client",
    ])
    def test_resend_verification_email(self, client_type, api_client: APIClient, authenticated_api_client: APIClient) -> None:
        url = reverse("resend_verification_email")

        if client_type == "api_client":
            response = api_client.post(url)
            assert response.status_code == status.HTTP_401_UNAUTHORIZED
        elif client_type == "authenticated_api_client":
            response = authenticated_api_client.post(url)
            assert response.status_code == status.HTTP_200_OK
        else:
            pytest.fail(f"Unexpected client type: {client_type}")
