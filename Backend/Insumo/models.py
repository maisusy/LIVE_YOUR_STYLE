from django.db import models
from Unidad_medida.models import Unidad_medida
from Marca.models import Marca

# Create your models here.
class Insumo (models.Model):
    nombre = models.CharField(max_length=50)
    id_u_med = models.ForeignKey(Unidad_medida,on_delete= models.CASCADE)
    stock = models.IntegerField()
    costo = models.FloatField()
    id_marca =  models.ForeignKey(Marca,on_delete= models.CASCADE)