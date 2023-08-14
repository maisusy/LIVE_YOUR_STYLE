from django.db import models

from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Tarjeta(models.Model):
    nro = models.IntegerField()
    f_venc = models.DateField()
    titular = models.CharField(max_length=100)
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)