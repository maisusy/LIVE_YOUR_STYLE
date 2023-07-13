from django.urls import path
from Color.views import (
    Color_id,
    color_lista
)

urlpatterns = [
    path('api/',color_lista.as_view()),
    path('api/<int:id>/',Color_id.as_view())
]
