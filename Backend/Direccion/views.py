from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Direccion.models import Direccion
from Direccion.serializers import DireccionSerializers


# Create your views here.

class Direccion_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args, **kwargs):
        direccion = Direccion.objects.all()
        serializer = DireccionSerializers(direccion,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
 
    def post(self,request,*args, **kwargs):
        serializer = DireccionSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Direccion_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

  
    def get_object(self,id):
        try:
            return  Direccion.objects.get(id=id)
        except Direccion.DoesNotExist:
            return None

    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = DireccionSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
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
    
