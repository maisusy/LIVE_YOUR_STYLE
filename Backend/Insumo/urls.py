from django.urls import path
from Insumo.views import  (
    Insumo_id,
    Insumo_lista
)

urlpatterns = [
    path('api/',Insumo_lista.as_view()),
    path('api/<int:id>/',Insumo_id.as_view())
]
