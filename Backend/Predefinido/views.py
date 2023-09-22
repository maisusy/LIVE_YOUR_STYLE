from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from Marca.models import Marca
from Marca.serializers import MarcaSerializer
from Categoria_producto.models import Cat_prod
from Categoria_producto.serializers import CatProdSerializer
from Unidad_medida.models import Unidad_medida
from Unidad_medida.serializers import UnidadMedidaSerializers
from Color.models import Color
from Color.serializers import ColorSerializers

# Create your views here.
class Predefinidos(APIView):
    permission_classes = [permissions.IsAuthenticated]

    
    def get(self,request,*args,**kwargs):
        try:
            data = Marca.objects.all()
            marca = MarcaSerializer(data, many=True)
            data = Cat_prod.objects.all()
            categoria = CatProdSerializer(data, many=True)
            data = Unidad_medida.objects.all()
            unidad_medida = UnidadMedidaSerializers(data, many=True)
            data = Color.objects.all()
            color = ColorSerializers(data, many=True)
 
            datos = {
                marca :marca.data,
                categoria:categoria.data,
                unidad_medida:unidad_medida.data,
                color : color.data
            }
            return Response(datos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)