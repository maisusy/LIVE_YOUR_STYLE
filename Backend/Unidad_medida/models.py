from django.db import models

# Create your models here.
class Unidad_medida(models.Model):
    nombre = models.CharField(max_length=50)
    