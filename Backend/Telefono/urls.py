from django.urls import path
from Telefono.views import ( 
    Telefono_lista,
    Telefono_id
)

urlpatterns = [
    path('api/',Telefono_lista.as_view()),
    path('api/<int:id>/',Telefono_id.as_view())
]
