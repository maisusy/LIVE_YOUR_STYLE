from django.db import models
class Cat_prod(models.Model):
    nombre = models.CharField(max_length=50)