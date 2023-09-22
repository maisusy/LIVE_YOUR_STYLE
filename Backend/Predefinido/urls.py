from django.urls import path
from Predefinido.views import ( Predefinidos)

urlpatterns = [
    path('',Predefinidos.as_view()),
]