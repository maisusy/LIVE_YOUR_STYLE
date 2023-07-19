from rest_framework import serializers
from Envio.models import Envio

class EnvioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Envio,
        field = ['id','id_venta','estado','costo_env','f_recibido','f_enviado']