from django.db import models
from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Turno(models.Model):
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
    motivo = models.CharField(max_length=50)
    fecha = models.DateField()
    hora = models.DateField()
    monto = models.FloatField()
    estado = models.CharField(max_length=50)