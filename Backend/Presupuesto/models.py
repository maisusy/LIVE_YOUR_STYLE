from django.db import models

# Create your models here.
class Presupuesto(models.Model):
    costo_total : models.FloatField()
    fecha_alta : models.DateField()
    precio_total : models.FloatField()