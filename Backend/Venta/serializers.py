from rest_framework import serializers
from Venta.models import Venta

class VentaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = ['id','usuario','correo','direccion','correo',
                  'telefono','precio_total','estado','fecha','medio_pago','productos']