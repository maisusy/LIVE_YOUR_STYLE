from rest_framework import serializers
from Color.serializers import ColorSerializers
from Producto.models import Producto


class ProductoSerializers(serializers.ModelSerializer):

    def validate(self, data):
        color = data['color']
        # my code
        return data

    def create(self, validated_data):
        colores = validated_data.pop('color')  # removing color from validated_data
        instance = Producto.objects.create(**validated_data)  # saving post object
        for color in colores:
            instance.colores.add(color)
        return instance
    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','id_cat_prod','precio','costo','id_u_med','original','id_marca','color']
