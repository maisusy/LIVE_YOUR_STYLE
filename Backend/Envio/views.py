from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Envio.models import Envio
from Envio.serializers import EnvioSerializers


# Create your views here.

class Envio_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args, **kwargs):
        envio = Envio.objects.all()
        serializer = EnvioSerializers(envio,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request,*args, **kwargs):

        serializer = EnvioSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Envio_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Envio.objects.get(id=id)
        except Envio.DoesNotExist:
            return None
    
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = EnvioSerializers(instance = instance, data=request.data, partial = True)
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
    
