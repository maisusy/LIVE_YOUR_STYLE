from rest_framework import serializers
from Observacion.models import Observacion

class ObservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observacion,
        field = ['id','detalle','fecha','usuario']