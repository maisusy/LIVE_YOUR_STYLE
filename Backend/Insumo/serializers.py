from rest_framework import serializers
from Insumo.models import Insumo

class InsumoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Insumo,
        field = ['id','nombre','id_u_med','stock','costo','id_obs','id_marca']