from django.urls import path
from Tarjeta.views import ( 
    Tarjeta_id,
    Tarjeta_lista
    )

urlpatterns = [
    path('api/',Tarjeta_lista.as_view()),
    path('api/<int:id>/',Tarjeta_id.as_view())
]