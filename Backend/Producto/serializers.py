from rest_framework import serializers
from Producto.models import Producto



class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id','nombre','stock','id_cat_prod','precio','costo','id_u_med','original','id_marca']