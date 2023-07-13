from rest_framework import serializers
from Compra.models import Compra

class CompraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Compra,
        field = ['id','costo_total','estado','fecha','nro']