from __future__ import annotations

from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response


class RetrieveBySlugMixin:
    def retrieve_by_slug(self, request: Request, slug: str | None = None) -> Response:
        queryset = self.get_queryset()
        try:
            obj = queryset.get(slug=slug)
        except queryset.model.DoesNotExist:
            raise NotFound(detail=f"{queryset.model.__name__} not found")
        serializer = self.get_serializer(obj)
        return Response(serializer.data)
