from __future__ import annotations

import logging
from typing import Optional

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action


from .models import Dashboard
from .serializers import DashboardSerializer

logger = logging.getLogger(__name__)


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]
    lookup_field = "id"

    def retrieve(self, request: Request, id: Optional[int] = None) -> Response:
        try:
            logger.info(f"Retrieving Dashboard with id {id}")
            dashboard = Dashboard.objects.get(id=id)
            serializer = DashboardSerializer(dashboard)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            logger.error(f"Dashboard with id {id} not found")
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

    @action(detail=True, methods=['post'], url_path="upload-image")
    def upload_image(self, request, id=None):
        try:
            instance = self.get_object()
            file = request.FILES.get('image')
            if not file:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
            instance.image = file
            instance.save()
            serializer = DashboardSerializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dashboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error uploading image: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

