from django.urls import path
from Compra.views import (
    Compra_id,
    Compra_lista
)

urlpatterns = [
    path('api/',Compra_lista.as_view()),
    path('api/<int:id>/',Compra_id.as_view())

]
