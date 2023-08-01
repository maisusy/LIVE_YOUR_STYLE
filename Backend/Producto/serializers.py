from rest_framework import serializers
from Color.serializers import ColorSerializers
from Color.models import Color
from Producto.models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','id_cat_prod','precio','costo','id_u_med','original','id_marca','color','obs']
