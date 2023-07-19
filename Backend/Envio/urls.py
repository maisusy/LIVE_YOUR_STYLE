from django.urls import path
from Envio.views import  (
    Envio_id,
    Envio_lista
)

urlpatterns = [
    path('api/',Envio_lista.as_view()),
    path('api/<int:id>/',Envio_id.as_view())
]
