from rest_framework import serializers
from Direccion.models import Direccion

class DireccionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Direccion,
        field = ['id','calle','nro','dpto','piso']