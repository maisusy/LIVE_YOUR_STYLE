from django.urls import path
from Producto.views import ( 
    Producto_id,
    Producto_lista
    )

urlpatterns = [
    path('api/',Producto_lista.as_view()),
    path('api/<int:id>/',Producto_id.as_view())
]