from rest_framework import serializers
from Color.serializers import ColorSerializers
from Color.models import Color
from Producto.models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    # color = ColorSerializers(read_only=True,many=True)

    # def create(self, validated_data):
    #     color = validated_data.pop('color')  # removing color from validated_data
    #     prod = Producto.objects.create(**validated_data)  # saving post object
    #     for c in color:
    #         prod.color.add(c)
    #     return prod

    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','id_cat_prod','precio','costo','id_u_med','original','id_marca','color']
