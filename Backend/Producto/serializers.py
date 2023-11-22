from rest_framework import serializers
from Categoria_producto.serializers import CatProdSerializer
from Color.serializers import ColorSerializers
from Marca.serializers import MarcaSerializer
from Color.models import Color
from Producto.models import ImagenesProductos, Producto


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ("nombre",)


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "id",
            "stock",
            "categoria_producto",
            "precio",
            "costo",
            "talle",
            "descripcion",
            "original",
            "marca",
            "color",
        ]


class GetProductoSerializers(serializers.ModelSerializer):
    categoria_producto = CatProdSerializer()
    marca = MarcaSerializer()
    color = ColorSerializer(many=True)

    class Meta:
        model = Producto
        fields = [
            "id",
            "stock",
            "categoria_producto",
            "precio",
            "costo",
            "talle",
            "descripcion",
            "original",
            "marca",
            "color",
        ]


class ImagenProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImagenesProductos
        fields = ["imagen", "producto"]
        read_only_fields = ["producto"]

    def create(self, validated_data):
        producto_id = validated_data.pop("producto_id")
        producto = Producto.objects.get(
            pk=producto_id
        )  # Ajusta esto según la estructura de tu modelo Producto

        imagen_producto = ImagenesProductos.objects.create(
            producto=producto, **validated_data
        )
        return imagen_producto
