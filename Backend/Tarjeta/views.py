from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Tarjeta.models import Tarjeta
from Tarjeta.serializers import TarjetaSerializers


class Tarjeta_lista(APIView):

    permission_classes = [permissions.IsAuthenticated]


    def get(self,request,*args,**kwargs):
        tarjeta = Tarjeta.objects.all()
        serializer = TarjetaSerializers(tarjeta,many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self,request,*args,**kwargs):

        serializer = TarjetaSerializers(data=request.data)
         
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Tarjeta_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Tarjeta.objects.get(id=id)
        except Tarjeta.DoesNotExist:
            return None
   
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TarjetaSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Eliminarrequest.data
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
    
