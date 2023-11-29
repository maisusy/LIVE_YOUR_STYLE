from rest_framework import serializers
from Proveedor.serializers import ProveedorSerializers
from Categoria_producto.serializers import CatProdSerializer
from Color.serializers import ColorSerializers
from Marca.serializers import MarcaSerializer
from Color.models import Color
from Producto.models import ImagenesProductos, Producto, ProductoInsumo
from Insumo.models import Insumo


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = (
            "id",
            "nombre",
        )


class ProductoInsumoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ["producto", "cantidad", "costo_total"]


class ProductoSerializers(serializers.ModelSerializer):
    insumos = serializers.SerializerMethodField()

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
            "insumos",
            "proveedor",
        ]

    def get_insumos(self, obj):
        qset = ProductoInsumo.objects.filter(producto=obj)
        return [ProductoInsumoSerializers(m).data for m in qset]

    def create(self, validated_data):
        insumos_data = validated_data.pop("insumos")
        color_data = validated_data.pop("color")

        producto_instance = Producto.objects.create(**validated_data)

        for insumo_data in insumos_data:
            instance_insumo = Insumo.objects.get(id=insumo_data.get("insumo"))
            ProductoInsumo.objects.create(
                producto=producto_instance,
                insumo=instance_insumo,
                cantidad=insumo_data.get("cantidad"),
                costo_total=insumo_data.get("costo_total"),
            )

        producto_instance.color.set(
            color_data
        )  # Utiliza el método set() para la relación muchos a muchos

        return producto_instance


class GetProductoSerializers(serializers.ModelSerializer):
    categoria_producto = CatProdSerializer()
    marca = MarcaSerializer()
    color = ColorSerializer(many=True)
    proveedor = ProveedorSerializers()

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
            "proveedor",
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
