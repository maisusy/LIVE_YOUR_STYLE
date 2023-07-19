from django.urls import path
from Presupuesto.views import (
    Presupuesto_id,
    Presupuesto_lista
)

urlpatterns = [
    path('api/',Presupuesto_lista.as_view()),
    path('api/<int:id>/',Presupuesto_id.as_view())
]