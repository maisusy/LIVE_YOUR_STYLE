from django.db import models

# Create your models here.
class Cat_prod(models.Model):
    nombre = models.CharField(max_length=50)