from rest_framework import serializers
from Proveedor.models import  Proveedor 

class ProveedorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ['id','cuit','razon_social','obs']