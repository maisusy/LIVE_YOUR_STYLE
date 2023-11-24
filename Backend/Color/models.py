from django.db import models

class Color(models.Model):
    nombre = models.CharField(max_length=50)
    tono = models.CharField(max_length=50)
    