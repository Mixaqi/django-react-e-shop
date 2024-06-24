import json
from django.http import JsonResponse
import re
from typing import Union, Any


class ConvertCamelToSnake:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method in ["POST", "PATCH", "PUT"] and self.is_json_request(
            request
        ):
            try:
                data = json.loads(request.body)
                if "fullName" in data and data["fullName"] == "":
                    return JsonResponse(
                        {"message": "Failed from the middleware"}
                    )
                data = self.convert_keys_to_snake_case(data)
                request._body = json.dumps(data).encode("utf-8")
            except json.JSONDecodeError:
                pass

        response = self.get_response(request)
        return response

    def is_json_request(self, request) -> bool:
        content_type = request.META.get("CONTENT_TYPE", "")
        return "application/json" in content_type

    def convert_keys_to_snake_case(
        self, data: Union[dict, list, Any]
    ) -> Union[dict, list, Any]:
        if isinstance(data, dict):
            return {
                self.camel_to_snake_case(key): self.convert_keys_to_snake_case(
                    value
                )
                for key, value in data.items()
            }
        elif isinstance(data, list):
            return [self.convert_keys_to_snake_case(item) for item in data]
        else:
            return data

    def camel_to_snake_case(self, name: str) -> str:
        s1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
        return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s1).lower()
