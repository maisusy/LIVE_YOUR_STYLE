from django.db import models
from Color.models import Color
from Unidad_medida.models import Unidad_medida
from Proveedor.models import Proveedor
from Marca.models import Marca


# Create your models here.
class Insumo(models.Model):
    descripcion = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50, default="")
    unidad_medida = models.ForeignKey(Unidad_medida, on_delete=models.CASCADE)
    stock = models.IntegerField()
    costo = models.FloatField()
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    color = models.ManyToManyField(Color, blank=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
