from django.db import models
from Proveedor.models import Proveedor
from Compra.models import Compra
from Insumo.models import Insumo


class Factura(models.Model):
    fecha_alta = models.DateField()
    fecha_registro = models.DateField()
    nro_factura = models.CharField(max_length=50)
    nro_comprobante = models.IntegerField()
    nro_p_vta = models.IntegerField()
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    insumos = models.ManyToManyField(Insumo, through="FacturaInsumo")


class FacturaInsumo(models.Model):
    fact = models.ForeignKey(Factura, on_delete=models.CASCADE)
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cant = models.IntegerField()
    costo_total = models.FloatField()