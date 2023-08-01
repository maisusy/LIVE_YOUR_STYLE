from rest_framework import serializers
from Insumo.models import Insumo

class InsumoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = ['id','nombre','id_u_med','stock',
                  'costo','id_marca','color','obs']