from rest_framework import serializers
from Factura.models import Factura,FacturaInsumo
from Insumo.models import Insumo  

class InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = ['id']

class FacturaInsumoSerializer(serializers.ModelSerializer):
    id_insumo = InsumoSerializer(read_only=True)
    class Meta:
        model = FacturaInsumo
        fields = ['id','id_insumo', 'cant', 'costo_total']

class FacturaInsumoDetalle(serializers.ModelSerializer):
    id_insumo = InsumoSerializer(read_only=True)  
    class Meta:
        model = FacturaInsumo
        fields = ['id', 'id_fact', 'id_insumo', 'cant', 'costo_total']

class FacturaSerializer(serializers.ModelSerializer):
    insumos = FacturaInsumoDetalle(read_only=True,many=True)
    class Meta:
        model = Factura
        fields = ['id', 'fecha_alta', 'fecha_registro', 'nro_factura',
                  'nro_comprobante', 'nro_p_vta', 'id_proveedor', 'id_compra', 'insumos']

                  
