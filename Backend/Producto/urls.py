from django.urls import path
from Producto.views import Producto_list,Producto_id

urlpatterns = [
    path('api/',Producto_list.as_view()),
    path('api/<int:id>/',Producto_id.as_view()),
]