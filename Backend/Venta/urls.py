from django.urls import path
from Venta.views import ( 
    Venta_id,
    Venta_lista
    )

urlpatterns = [
    path('api/',Venta_lista.as_view()),
    path('api/<int:id>/',Venta_id.as_view())
]