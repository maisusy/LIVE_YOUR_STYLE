from django.db import models
from Categoria_producto.models import Cat_prod
from Unidad_medida.models import Unidad_medida
from Marca.models import Marca
from Observacion.models import Observacion

# Create your models here.
class Producto(models.Model):
    nombre : models.CharField(max_length=50)
    stock : models.IntegerField()
    id_cat_prod : models.ForeignKey( Cat_prod  ,on_delete=models.CASCADE)
    precio : models.FloatField()
    costo : models.FloatField()
    id_u_med : models.ForeignKey(Unidad_medida , on_delete=models.CASCADE)
    original : models.BooleanField()
    id_marca : models.ForeignKey(Marca,on_delete=models.CASCADE)