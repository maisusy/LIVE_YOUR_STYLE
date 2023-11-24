from rest_framework import serializers
from Direccion.models import Direccion

class DireccionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['id','calle','nro','dpto','piso','alias','usuario']