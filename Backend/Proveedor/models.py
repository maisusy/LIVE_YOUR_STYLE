from django.db import models

# Create your models here.
class Proveedor(models.Model):
    razon_social = models.CharField(max_length=100)
    cuit = models.CharField(max_length=100)
    obs = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre
    
