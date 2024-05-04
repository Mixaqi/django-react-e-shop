from __future__ import annotations

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Dashboard
from .serializers import DashboardSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def retrieve(self, request, id=None):
        try:
            dashboard = Dashboard.objects.get(id=id)
            serializer = DashboardSerializer(dashboard)
            return Response(serializer.data)
        except Dashboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
