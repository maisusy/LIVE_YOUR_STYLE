from django.db import models
from Datos_Usuario.models import Datos_Usuario
from Presupuesto.models import Presupuesto
from Turno.models import Turno

# Create your models here.
class Orden_Trabajo(models.Model):
    presupuesto = models.ForeignKey(Presupuesto,on_delete=models.CASCADE)
    turno = models.ForeignKey(Turno,on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)
    usuario = models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)
    fecha = models.DateField()