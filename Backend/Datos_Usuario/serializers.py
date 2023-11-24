from rest_framework import serializers
from Datos_Usuario.models import Datos_Usuario
from django.contrib.auth.models import User


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "password",
        ]


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
            "nivel",
            "telefono"
        ]
