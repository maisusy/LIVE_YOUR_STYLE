from django.db import models

# Create your models here.
class Observacion(models.Model):
    detalle = models.TextField(max_length=100)
    fecha = models.DateField()
    usuario = models.CharField(max_length=50)
    