from django.urls import path
from Predefinido.views import ( Predefinidos)

urlpatterns = [
    path('api/',Predefinidos.as_view()),
]