from django.urls import path
from Producto.views import Producto_list,Producto_id,Producto_imagen,Producto_imagen_lista


urlpatterns = [
    path('api/',Producto_list.as_view()),
    path('api/<int:id>/',Producto_id.as_view()),
    path('subir_imagen/<int:id>/',Producto_imagen.as_view()),
    path('imagenes/',Producto_imagen_lista.as_view()),
]