from rest_framework import serializers
from Color.serializers import ColorSerializers
from Producto.models import Producto



class ProductoSerializers(serializers.ModelSerializer):
    color = ColorSerializers(many=True)
    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','id_cat_prod','precio','costo','id_u_med','original','id_marca','color']

    def create(self,validated_data):

        color_data = validated_data.pop('color')

        producto = Producto.objects.create(**validated_data)

        for color_data in color_data :
            Color.objects.create(producto=producto,**color_data)

        return producto