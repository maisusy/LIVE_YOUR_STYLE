from django.db import models

from Datos_Usuario.models import Datos_Usuario

# Create your models here.
class Correo(models.Model):
    correo : models.CharField(max_length=100)
    id_usuario : models.ForeignKey(Datos_Usuario,on_delete=models.CASCADE)