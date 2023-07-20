from django.db import models

# Create your models here.
class Color(models.Model):
    nombre = models.CharField(max_length=50)
    tono = models.CharField(max_length=50)
    