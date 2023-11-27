from rest_framework import serializers
from Proveedor.serializers import ProveedorSerializers
from Unidad_medida.serializers import UnidadMedidaSerializers
from Color.models import Color
from Marca.serializers import MarcaSerializer
from Insumo.models import Insumo


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = (
            "id",
            "nombre",
        )


class InsumoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = [
            "id",
            "descripcion",
            "unidad_medida",
            "stock",
            "costo",
            "marca",
            "color",
            "proveedor",
            "tipo",
        ]


class GetInsumoSerializers(serializers.ModelSerializer):
    marca = MarcaSerializer()
    color = ColorSerializer(many=True)
    proveedor = ProveedorSerializers()
    unidad_medida = UnidadMedidaSerializers()

    class Meta:
        model = Insumo
        fields = [
            "id",
            "descripcion",
            "unidad_medida",
            "stock",
            "costo",
            "marca",
            "color",
            "proveedor",
            "tipo",
        ]
