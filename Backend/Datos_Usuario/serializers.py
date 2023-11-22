from rest_framework import serializers
from Datos_Usuario.models import Datos_Usuario


class Datos_UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Datos_Usuario
        fields = [
            "id",
            "usuario",
            "nombres",
            "apellidos",
            "fecha_alta",
            "dni",
            "dir",
            "nivel",
        ]
