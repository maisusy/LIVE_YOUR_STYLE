from rest_framework import serializers
from Venta.models import Venta

class VentaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = ['id','id_usuario','id_correo','id_direccion','id_correo','id_telefono','precio_total','estado','fecha','medio_pago','productos']