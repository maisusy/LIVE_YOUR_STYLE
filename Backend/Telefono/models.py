from django.db import models

from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Telefono(models.Model):
    cod = models.IntegerField()
    nro = models.IntegerField()
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)