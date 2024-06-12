from django.urls import path, include
from .views import UserViewSet


app_name = "authentication"
urlpatterns = [
    path(
        "<int:pk>/",
        UserViewSet.as_view(
            {
                "get": "retrieve",
            }
        ),
        name="user-info",
    ),
]
