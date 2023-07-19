from rest_framework import serializers

from Presupuesto.models import Presupuesto

class PresupuestoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Presupuesto
        field = ['id','costo_total','precio_total','fecha_alta']