from django.db import models
from Color.models import Color
from Categoria_producto.models import Cat_prod
from Marca.models import Marca


# Create your models here.
class Producto(models.Model):
    stock = models.IntegerField()
    categoria_producto = models.ForeignKey(Cat_prod, on_delete=models.CASCADE)
    precio = models.FloatField()
    costo = models.FloatField()
    talle = models.CharField(max_length=4)
    original = models.BooleanField()
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    color = models.ManyToManyField(Color, blank=True)
    descripcion = models.CharField(max_length=200)


class ImagenesProductos(models.Model):
    imagen = models.ImageField(upload_to="productos/", null=True, blank=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
