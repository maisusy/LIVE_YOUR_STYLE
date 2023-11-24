from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Proveedor.models import Proveedor
from Proveedor.serializers import ProveedorSerializers


# Create your views here.

class Proveedor_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

 
    def get(self,request,*args, **kwargs):
        proveedor = Proveedor.objects.all()
        serializer = ProveedorSerializers(proveedor,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,*args, **kwargs):


        serializer = ProveedorSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Proveedor_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Proveedor.objects.get(id=id)
        except Proveedor.DoesNotExist:
            return None
    
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProveedorSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Delete
    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "No exite el objeto"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
        return Response(
            {"res": "Objeto Eliminado"},
            status=status.HTTP_200_OK
        )
    
