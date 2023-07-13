from django.urls import path
from Categoria_producto.views import (
    cat_prod_id,
    cat_prod_lista
)

urlpatterns = [
     path('api',cat_prod_lista.as_view()),
     path('api/<int:id>/',cat_prod_id.as_view())
]
