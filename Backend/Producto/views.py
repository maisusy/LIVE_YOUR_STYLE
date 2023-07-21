from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny  # NOQA
from rest_framework.response import Response
from rest_framework import status
from Producto.serializers import ProductoSerializers
from Producto.models import Producto


class Producto_GET(APIView):
    queryset = Producto.objects.none()
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
    
        data = {
            "nombre" : request.data.get("nombre"),
            "stock" : request.data.get("stock"),
            "id_cat_prod" : request.data.get("id_cat_prod"),
            "precio" : request.data.get("precio"),
            "costo" : request.data.get("costo"),
            "id_u_med" : request.data.get("id_u_med"),
            "original" : request.data.get("original"),
            "id_marca" : request.data.get("id_marca")
        }

        _serializer = ProductoSerializers(data=data)  # NOQA
        if _serializer.is_valid():
            _serializer.save(color = request.data.get('color'))
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # NOQA

    def get(self, request, *args, **kwargs):

        prod = Producto.objects.all()
        serializer = ProductoSerializers(prod,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
