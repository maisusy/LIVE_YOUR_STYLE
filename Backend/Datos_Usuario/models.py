from django.db import models
from django.contrib.auth.models import User
from Direccion.models import Direccion

# Create your models here.
class Datos_Usuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_alta = models.DateField()
    dni = models.IntegerField()
    cuit = models.CharField(max_length=13)
    dir = models.ManyToManyField(Direccion,blank=True)

