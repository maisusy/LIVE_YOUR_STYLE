from django.urls import path
from Orden_trabajo.views import ( 
    Orden_Trabajo_id,
    Orden_Trabajo_lista
    )

urlpatterns = [
    path('api/',Orden_Trabajo_lista.as_view()),
    path('api/<int:id>/',Orden_Trabajo_id.as_view())
]