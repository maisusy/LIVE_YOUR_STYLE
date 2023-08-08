from rest_framework import serializers
from Factura.models import Factura,Factura_Insumo



class Factura_InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura_Insumo
        fields = ['id','id_fact','id_insumo','cant','costo_total']

class FacturaSerializer(serializers.ModelSerializer):
    
    insumos = Factura_InsumoSerializer(many=True, read_only=True)
    class Meta:
        model = Factura
        fields = ['id','fecha_alta','fecha_registro','nro_factura',
                  'nro_comprobante','nro_p_vta','id_proveedor','id_compra','insumos']
    