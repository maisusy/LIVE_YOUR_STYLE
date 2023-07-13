from rest_framework  import serializers
from Unidad_medida.models import Unidad_medida

class UnidadMedidaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Unidad_medida,
        fields = ['id','nombre']