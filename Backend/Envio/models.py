from django.db import models

from Venta.models import Venta

# Create your models here.
class Envio (models.Model):
    venta = models.ForeignKey(Venta,on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)
    costo_env = models.FloatField(null=True)
    f_recibido = models.CharField(max_length=50)
    f_enviado = models.CharField(max_length=50)