from django.db import models

from Correo.models import Correo
from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Turno(models.Model):
    id_usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
    id_correo = models.ForeignKey(Correo,on_delete=models.CASCADE,null=True)
    motivo = models.CharField(max_length=50)
    fecha = models.DateField()
    hora = models.DateField()
    monto = models.FloatField()
    estado = models.CharField(max_length=50)