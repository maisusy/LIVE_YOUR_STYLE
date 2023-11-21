from django.urls import path
from Datos_Usuario.views import  (
    Datos_Usuario_id,
    Datos_Usuario_lista,
    Datos_Usuario_crear
)

urlpatterns = [
    path('api/',Datos_Usuario_lista.as_view()),
    path('api/crear/',Datos_Usuario_crear.as_view()),
    path('api/<int:id>/',Datos_Usuario_id.as_view())
]
