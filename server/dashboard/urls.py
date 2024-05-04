from django.urls import path
from .views import DashboardViewSet


app_name = "dashboard"
urlpatterns = [
    path("<int:id>/", DashboardViewSet.as_view({"get": "retrieve"}), name="dashboard-detail"),  
]