from django.db import models

from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Direccion(models.Model):
    calle = models.CharField(max_length=100)
    nro = models.IntegerField()
    dpto = models.IntegerField()
    piso = models.IntegerField()
    alias = models.CharField(max_length=50)
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
