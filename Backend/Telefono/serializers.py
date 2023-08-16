from rest_framework import serializers
from Telefono.models import  Telefono 

class TelefonoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Telefono
        fields = ['id','cod','nro','usuario']