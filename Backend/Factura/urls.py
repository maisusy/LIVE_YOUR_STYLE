from django.urls import path
from Factura.views import (
    Factura_id,
    Factura_lista   
)

urlpatterns = [
    path('api/',Factura_lista.as_view()),
    path('api/<int:id>/',Factura_id.as_view())
]