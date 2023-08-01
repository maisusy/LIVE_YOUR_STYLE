from rest_framework import serializers
from Factura.models import Factura

class FacturaSerializer(serializers.ModelSerializer):
    class Factura:
        model = Factura
        fields = ['id','fecha_alta','fecha_registro','nro_factura','comprobante','nro_p_vta','id_proveedor','id_compra','insumos']