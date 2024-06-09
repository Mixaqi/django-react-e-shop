from __future__ import annotations

from typing import Optional

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import action
from config.settings import logger


from .models import Dashboard
from .serializers import DashboardSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, JSONParser]
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
        logger.info(f"Partial update requested for Dashboard with id {id} and data: {request.data}")
        try:
            instance = self.get_object()
            # logger.info(f"Dashboard instance found: {instance}")
            
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            # logger.info(f"Serializer initialized with data: {request.data}")
            
            serializer.is_valid(raise_exception=True)
            # logger.info(f"Data is valid: {serializer.validated_data}")
            
            self.perform_update(serializer)
            # logger.info(f"Dashboard instance updated: {serializer.data}")
            
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            logger.error(f"Dashboard with id {id} not found")
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error during partial update: {e}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], url_path="upload-image")
    def upload_image(self, request: Request, id: Optional[int] = None) -> Response:
        try:
            instance = self.get_object()
            file = request.FILES.get('image')
            if not file:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
            if instance.image:
                instance.image.delete()
            instance.image = file
            logger.info("FUNCTION IS WORKING")
            instance.save()
            serializer = DashboardSerializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dashboard.DoesNotExist:
            return Response({"error": "Dashboard not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error uploading image: {e}")
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

