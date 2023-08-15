from rest_framework import serializers
from Factura.models import Factura,FacturaInsumo
from Insumo.models import Insumo  



class FacturaInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaInsumo
        fields = ['id','fact','insumo', 'cant', 'costo_total']

class FacturaSerializer(serializers.ModelSerializer):
    insumos = serializers.SerializerMethodField()

    class Meta:
        model = Factura
        fields = ['fecha_alta', 'fecha_registro', 'nro_factura', 'nro_comprobante', 'nro_p_vta',
                  'proveedor', 'compra', 'insumos']

    def get_insumos(self,obj):
        qset = FacturaInsumo.objects.filter(fact=obj)
        return [FacturaInsumoSerializer(m).data for m in qset]

    def create(self, validated_data):

        insumos = validated_data.pop('insumos')

        factura_intance = Factura.objects.create(**validated_data)
        for item in insumos:
            instance_insumo = Insumo.objects.get(id=item.get('insumo'))  

            FacturaInsumo.objects.create(
                fact = factura_intance,
                insumo= instance_insumo,
                cant = item.get('cant'),
                costo_total = item.get('costo_total')
            )


        data = {**validated_data,
                "insumos" : insumos
            }


        return data
            
                  
                  
