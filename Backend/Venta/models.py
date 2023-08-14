from django.db import models
from Correo.models import Correo
from Datos_Usuario.models import Datos_Usuario
from Direccion.models import Direccion
from Telefono.models import Telefono
from Producto.models import Producto

# Create your models here.
class Venta(models.Model):
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
    direccion = models.ForeignKey(Direccion,on_delete=models.CASCADE)
    telefono = models.ForeignKey(Telefono,on_delete=models.CASCADE)
    correo = models.ForeignKey(Correo,on_delete=models.CASCADE,null=True)
    precio_total = models.FloatField()
    medio_pago = models.CharField(max_length=50)
    fecha = models.DateField()
    estado = models.CharField(max_length=50)
    productos = models.ManyToManyField(Producto,through="Producto_venta",through_fields=("venta","producto"))


class Producto_venta(models.Model):
    producto = models.ForeignKey(Producto,on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta,on_delete=models.CASCADE)
    cant = models.IntegerField()
    p_total = models.FloatField()
