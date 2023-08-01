from django.db import models

# Create your models here.
class Direccion(models.Model):
    calle = models.CharField(max_length=100)
    nro = models.IntegerField()
    dpto = models.IntegerField()
    piso = models.IntegerField()