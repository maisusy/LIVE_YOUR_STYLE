from django.db import models
from django.contrib.auth.models import User

class Datos_Usuario(models.Model):
    OPCIONES = [
        (1, "Administrador"),
        (2, "Clientes"),
        (3, "Diseñador/Estilista"),
        (4, "Contador"),
        (5, "Atencion al Cliente"),
    ]
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_alta = models.DateField(auto_now=True)
    dni = models.IntegerField(unique=True)
    nivel = models.CharField(max_length=10, choices=OPCIONES)
    telefono = models.CharField(max_length=70,blank=True)
