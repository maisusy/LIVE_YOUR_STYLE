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

    def get(self, request, *args, **kwargs):
        try:
            marca_data = Marca.objects.all()
            categoria_data = Cat_prod.objects.all()
            unidad_medida_data = Unidad_medida.objects.all()
            color_data = Color.objects.all()

            marca_serializer = MarcaSerializer(marca_data, many=True)
            categoria_serializer = CatProdSerializer(categoria_data, many=True)
            unidad_medida_serializer = UnidadMedidaSerializers(unidad_medida_data, many=True)
            color_serializer = ColorSerializers(color_data, many=True)

            datos = {
                "marca": marca_serializer.data,
                "categoria": categoria_serializer.data,
                "unidad_medida": unidad_medida_serializer.data,
                "color": color_serializer.data
            }

            return Response(datos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
