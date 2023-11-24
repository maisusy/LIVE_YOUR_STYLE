from rest_framework import serializers
from Turno.models import Turno

class TurnoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ['id','usuario','motivo','fecha','hora','monto','estado']