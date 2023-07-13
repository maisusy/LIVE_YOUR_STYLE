from django.urls import path
from Proveedor.views import ( 
    Proveedor_lista,
    Proveedor_id
)

urlpatterns = [
    path('api/',Proveedor_lista.as_view()),
    path('api/<int:id>/',Proveedor_id.as_view())
]
