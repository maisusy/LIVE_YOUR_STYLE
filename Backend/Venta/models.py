from django.db import models
from Datos_Usuario.models import Datos_Usuario
from Direccion.models import Direccion
from Producto.models import Producto


class Venta(models.Model):
    usuario = models.ForeignKey(Datos_Usuario, on_delete=models.CASCADE)
    precio_total = models.FloatField()
    medio_pago = models.CharField(max_length=50)
    fecha = models.DateField()
    estado = models.CharField(max_length=50)
    productos = models.ManyToManyField(Producto, through="ProductoVenta")


class ProductoVenta(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    cant = models.IntegerField()
    p_total = models.FloatField()
