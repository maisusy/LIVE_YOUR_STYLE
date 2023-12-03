from rest_framework import serializers
from Venta.models import Venta, ProductoVenta
from Producto.models import Producto


class ProductoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoVenta
        fields = ["producto", "cant", "p_total"]


class VentaSerializers(serializers.ModelSerializer):
    productos = serializers.SerializerMethodField()

    class Meta:
        model = Venta
        fields = [
            "id",
            "usuario",
            "precio_total",
            "estado",
            "fecha",
            "medio_pago",
            "productos",
        ]

    def get_productos(self, obj):
        qset = ProductoVenta.objects.filter(venta=obj)
        return [ProductoVentaSerializer(m).data for m in qset]

    def create(self, validated_data):
        productos = validated_data.pop("productos")
        venta_instance = Venta.objects.create(**validated_data)
        for item in productos:
            instance_producto = Producto.objects.get(id=item.get("producto_id"))

            ProductoVenta.objects.create(
                venta=venta_instance,
                producto=instance_producto,
                cant=item.get("cantidad"),
                p_total=item.get("costo_total"),
            )

        return venta_instance
