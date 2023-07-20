from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Compra.models import Compra
from Compra.serializers import CompraSerializer


# Create your views here.

class Compra_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #lista 
    def get(self,request,*args, **kwargs):
        compra = Compra.objects.all()
        serializer = CompraSerializer(compra,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Crear
    def post(self,request,*args, **kwargs):
        data = {
            'costo_total' : request.data.get('costo_total'),
            'estado' : request.data.get('estado'),
            'fecha' : request.data.get('fecha'),
            'nro' : request.data.get('nro'),
        }

        serializer = CompraSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Compra_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Compra.objects.get(id=id)
        except Compra.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CompraSerializer(instance)
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
            'costo_total' : request.data.get('costo_total'),
            'estado' : request.data.get('estado'),
            'fecha' : request.data.get('fecha'),
            'nro' : request.data.get('nro'),
        }
        serializer = CompraSerializer(instance = instance, data=data, partial = True)
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
    
