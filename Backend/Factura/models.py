from django.db import models
from Proveedor.models import Proveedor
from Compra.models import Compra

# Create your models here.

class Factura (models.Model):
    fecha_alta : models.DateField()
    fecha_registro : models.DateField()
    nro_factura : models.CharField(max_length=50)
    nro_comprobante : models.IntegerField()
    nro_p_vta : models.IntegerField()
    id_proveedor: models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    id_compra: models.ForeignKey(Proveedor,on_delete=models.CASCADE)