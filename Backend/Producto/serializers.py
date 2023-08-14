from rest_framework import serializers
from Color.serializers import ColorSerializers
from Color.models import Color
from Producto.models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','categoria_producto','precio','costo','unidad_medida','original','marca','color','obs']
