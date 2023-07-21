from django.urls import path
from Producto.views import Producto_GET

urlpatterns = [
    path('api/',Producto_GET.as_view()),
]