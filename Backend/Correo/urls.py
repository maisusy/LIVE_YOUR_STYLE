from django.urls import path
from Correo.views import  (
    Correo_id,
    Correo_lista
)

urlpatterns = [
    path('api/',Correo_lista.as_view()),
    path('api/<int:id>/',Correo_id.as_view())
]
