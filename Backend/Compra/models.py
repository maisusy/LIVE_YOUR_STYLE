from django.db import models

# Create your models here.
class Compra(models.Model):
    costo_total = models.FloatField()
    estado = models.CharField(max_length=50)
    fecha = models.DateField()
    nro = models.IntegerField()
    def __str__(self):
        return self.nro
    