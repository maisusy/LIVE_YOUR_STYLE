from django.urls import path
from Unidad_medida.views import (
    Unidad_medida_id,
    Unidad_medida_lista
)

urlpatterns = [
    path('api/',Unidad_medida_lista.as_view()),
    path('api/<int:id>/',Unidad_medida_id.as_view())
]
