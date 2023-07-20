from django.db import models

# Create your models here.
class Datos_Usuario(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_alta = models.DateField()
    dni = models.IntegerField()
    cuit = models.CharField(max_length=12)
    def __str__(self):
        return self.nombres