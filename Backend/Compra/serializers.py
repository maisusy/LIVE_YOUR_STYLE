from rest_framework import serializers
from Compra.models import Compra

class ComprasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = ['id','costo_total','estado','fecha','nro']