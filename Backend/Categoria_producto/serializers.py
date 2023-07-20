from rest_framework import serializers
from Categoria_producto.models import Cat_prod

class CatProdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat_prod
        fields = ['id','nombre']