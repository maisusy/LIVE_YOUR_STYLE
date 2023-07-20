from django.db import models
from Color.models import Color
from Categoria_producto.models import Cat_prod
from Unidad_medida.models import Unidad_medida
from Marca.models import Marca

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    stock = models.IntegerField()
    id_cat_prod = models.ForeignKey( Cat_prod  ,on_delete=models.CASCADE)
    precio = models.FloatField()
    costo = models.FloatField()
    id_u_med = models.ForeignKey(Unidad_medida , on_delete=models.CASCADE)
    original = models.BooleanField()
    id_marca = models.ForeignKey(Marca,on_delete=models.CASCADE)
    color = models.ManyToManyField(Color)
    # color : models.ManyToManyField(Color,through='producto_color')


# class producto_color(models.Model):
#     id_producto: models.ForeignKey(Producto,on_delete=models.CASCADE)
#     id_color : models.ForeignKey(Color,on_delete=models.CASCADE)