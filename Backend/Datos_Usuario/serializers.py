from rest_framework import serializers
from Datos_Usuario.models import Datos_Usuario

class Datos_UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Datos_Usuario,
        field = ['id','nombres','apellidos','fecha_alta','dni','cuit']