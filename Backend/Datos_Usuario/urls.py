from django.urls import path
from Datos_Usuario.views import  (
    Datos_Usuario_id,
    Datos_Usuario_lista
)

urlpatterns = [
    path('api/',Datos_Usuario_lista.as_view()),
    path('api/<int:id>/',Datos_Usuario_id.as_view())
]
