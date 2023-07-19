from rest_framework import serializers
from Tarjeta.models import Tarjeta

class TarjetaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = ['id','nro','f_venc','titular','id_usuario']