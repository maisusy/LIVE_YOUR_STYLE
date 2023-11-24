from rest_framework import serializers
from Insumo.models import Insumo

class InsumoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = ['id','nombre','unidad_medida','stock',
                  'costo','marca','color','proveedor']