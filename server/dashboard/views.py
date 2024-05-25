from __future__ import annotations

import logging
from typing import Optional

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from .models import Dashboard
from .serializers import DashboardSerializer

logger = logging.getLogger(__name__)


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def retrieve(self, request: Request, id: Optional[int] = None) -> Response:
        try:
            dashboard = Dashboard.objects.get(id=id)
            serializer = DashboardSerializer(dashboard)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def partial_update(self, request: Request, id: Optional[int] = None, *args, **kwargs) -> Response:
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

