from django.urls import path
from Observacion.views import  (
    Observacion_id,
    Observacion_lista
)

urlpatterns = [
    path('api/',Observacion_lista.as_view()),
    path('api/<int:id>/',Observacion_id.as_view())
]
