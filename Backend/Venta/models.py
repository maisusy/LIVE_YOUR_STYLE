from django.db import models
from Correo.models import Correo
from Datos_Usuario.models import Datos_Usuario
from Direccion.models import Direccion
from Telefono.models import Telefono

# Create your models here.
class Venta(models.Model):
    id_usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
    id_direccion = models.ForeignKey(Direccion,on_delete=models.CASCADE)
    id_telefono = models.ForeignKey(Telefono,on_delete=models.CASCADE)
    id_correo = models.ForeignKey(Correo,on_delete=models.CASCADE,null=True)
    precio_total = models.FloatField()
    medio_pago = models.CharField(max_length=50)
    fecha = models.DateField()
    estado = models.CharField(max_length=50)