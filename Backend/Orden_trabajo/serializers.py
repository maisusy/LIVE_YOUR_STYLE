from rest_framework import serializers
from Orden_trabajo.models import Orden_Trabajo

class Orden_trabajoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Orden_Trabajo
        fields = ['id','presupuesto','turno','estado','usuario','fecha']