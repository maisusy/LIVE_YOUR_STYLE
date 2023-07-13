from django.urls import path, include
from Marca.views import (
    marca_lista,
    marca_id
)

urlpatterns = [
    path('api', marca_lista.as_view()),
    path('api/<int:id>/', marca_id.as_view()),
]