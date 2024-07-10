from __future__ import annotations

import json
import re
from typing import Any, Callable

from django.http import HttpRequest, HttpResponse


class ConvertCamelToSnake:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        if request.method in ["POST", "PATCH", "PUT"] and self.is_json_request(
            request,
        ):
            try:
                data = json.loads(request.body)
                data = self.convert_keys_to_snake_case(data)
                request._body = json.dumps(data).encode("utf-8")
            except json.JSONDecodeError:
                pass

        return self.get_response(request)

    def is_json_request(self, request: HttpRequest) -> bool:
        content_type = request.META.get("CONTENT_TYPE", "")
        return "application/json" in content_type

    def convert_keys_to_snake_case(self, data: dict | list | Any) -> dict | list | Any:
        if isinstance(data, dict):
            return {
                self.camel_to_snake_case(key): self.convert_keys_to_snake_case(value)
                for key, value in data.items()
            }
        if isinstance(data, list):
            return [self.convert_keys_to_snake_case(item) for item in data]
        return data

    def camel_to_snake_case(self, name: str) -> str:
        s1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
        return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s1).lower()
