from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Producto.models import Producto
from Producto.serializers import ProductoSerializers


class Producto_lista(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #lista
    def get(self,request,*args,**kwargs):
        prod = Producto.objects.all()
        serializer = ProductoSerializers(prod,many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    #cREAR
    def post(self,request,*args,**kwargs):
        data = {
            'nombre' : request.data.get('nombre'),
            'stock' : request.data.get('stock'),
            'id_cat_prod' : request.data.get('id_cat_prod'),
            'precio' : request.data.get('precio'),
            'costo' : request.data.get('costo'),
            'id_u_med' : request.data.get('id_u_med'),
            'original' : request.data.get('original'),
            'id_marca' : request.data.get('id_marca'),
        }

        serializer = ProductoSerializers(dat=data)
         
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.errors,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Producto_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Producto.objects.get(id=id)
        except Producto.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProductoSerializers(instance)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #UPDATE
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'nombre' : request.data.get('nombre'),
            'stock' : request.data.get('stock'),
            'id_cat_prod' : request.data.get('id_cat_prod'),
            'precio' : request.data.get('precio'),
            'costo' : request.data.get('costo'),
            'id_u_med' : request.data.get('id_u_med'),
            'original' : request.data.get('original'),
            'id_marca' : request.data.get('id_marca'),
        }

        serializer = ProductoSerializers(instance = instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Eliminar
    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
    
