from django.urls import path
from Turno.views import ( 
    Turno_id,
    Turno_lista
    )

urlpatterns = [
    path('api/',Turno_lista.as_view()),
    path('api/<int:id>/',Turno_id.as_view())
]