from django.urls import path
from Direccion.views import  (
    Direccion_id,
    Direccion_lista
)

urlpatterns = [
    path('api/',Direccion_lista.as_view()),
    path('api/<int:id>/',Direccion_id.as_view())
]
