from rest_framework import serializers
from Color.serializers import ColorSerializers
from Color.models import Color
from Producto.models import ImagenesProductos, Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields =  ['id','nombre','stock','categoria_producto','precio','costo','unidad_medida','original','marca','color','obs']

class ImagenProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImagenesProductos
        fields = ['imagen', 'producto']
        read_only_fields = ['producto']  # Marcar el campo como de solo lectura

    def create(self, validated_data):
        producto_id = validated_data.pop('producto_id')
        producto = Producto.objects.get(pk=producto_id)  # Ajusta esto según la estructura de tu modelo Producto

        imagen_producto = ImagenesProductos.objects.create(producto=producto, **validated_data)
        return imagen_producto