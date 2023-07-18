from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Insumo.models import Insumo
from Insumo.serializers import InsumoSerializers


# Create your views here.

class Insumo_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #lista 
    def get(self,request,*args, **kwargs):
        insumo = Insumo.objects.all()
        serializer = InsumoSerializers(insumo,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Crear
    def post(self,request,*args, **kwargs):
        data = {
            'nombre' : request.data.get('nombre'),
            'id_u_med' : request.data.get('id_u_med'),
            'stock' : request.data.get('stock'),
            'costo' : request.data.get('costo'),
            'id_obs' : request.data.get('id_obs'),
            'id_marca' : request.data.get('id_marca'),
        }

        serializer = InsumoSerializers(dat=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.errors,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Insumo_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Insumo.objects.get(id=id)
        except Insumo.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = InsumoSerializers(instance)
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
            'id_u_med' : request.data.get('id_u_med'),
            'stock' : request.data.get('stock'),
            'costo' : request.data.get('costo'),
            'id_obs' : request.data.get('id_obs'),
            'id_marca' : request.data.get('id_marca'),
        }
        serializer = InsumoSerializers(instance = instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Delete
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
    
