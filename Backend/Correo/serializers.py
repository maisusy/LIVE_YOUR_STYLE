from rest_framework import serializers
from Correo.models import Correo

class CorreoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Correo
        fields = ['id','nombre','usuario']