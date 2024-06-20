from __future__ import annotations

from typing import Optional

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from django.db.models import QuerySet

from config.settings import logger


from .models import Dashboard
from .serializers import DashboardSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, JSONParser, FormParser]
    # lookup_field = "id"

    def get_queryset(self) -> QuerySet[Dashboard]:
        return Dashboard.objects.filter(user=self.request.user)

    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        try:
            dashboard = self.get_queryset().first()
            if not dashboard:
                raise Dashboard.DoesNotExist
            serializer = DashboardSerializer(dashboard)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            logger.error(f"Dashboard not found for user {request.user.id}")
            return Response(status=status.HTTP_404_NOT_FOUND)

    def partial_update(self, request: Request, *args, **kwargs) -> Response:
        try:
            instance = self.get_queryset().first()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            logger.error(f"Dashboard with id {id} not found")
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error during partial update: {e}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=["post"], url_path="upload-image")
    def upload_image(self, request: Request) -> Response:
        try:
            instance = self.get_queryset().first()
            if instance is None:
                raise NotFound("Dashboard instance not found")

            file = request.FILES.get("image")
            if not file:
                return Response(
                    {"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST
                )
            if instance.image:
                instance.image.delete()
            instance.image = file
            instance.save()
            serializer = DashboardSerializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except NotFound as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error uploading image: {e}")
            return Response(
                {"error": f"Internal Server Error {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(detail=False, methods=["post"], url_path="delete-image")
    def delete_image(self, request: Request) -> Response:
        try:
            instance = self.get_queryset().first()
            if instance is None:
                raise NotFound("Dashboard instance not found")

            if instance.image:

                instance.image.delete()
                instance.save()
                return Response(
                    {"message": "Image deleted successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "No image to delete"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except NotFound as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            logger.error(f"Error deleting image: {e}")
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
