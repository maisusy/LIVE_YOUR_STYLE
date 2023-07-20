from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Tarjeta.models import Tarjeta
from Tarjeta.serializers import TarjetaSerializers


class Tarjeta_lista(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #lista
    def get(self,request,*args,**kwargs):
        tarjeta = Tarjeta.objects.all()
        serializer = TarjetaSerializers(tarjeta,many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    #cREAR
    def post(self,request,*args,**kwargs):
        data = {
            'nro' : request.data.get('nro'),
            'titular' : request.data.get('titular'),
            'f_venc' : request.data.get('f_venc'),
            'id_usuario' : request.data.get('id_usuario'),
        }

        serializer = TarjetaSerializers(data=data)
         
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Tarjeta_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Tarjeta.objects.get(id=id)
        except Tarjeta.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TarjetaSerializers(instance)
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
            'nro' : request.data.get('nro'),
            'titular' : request.data.get('titular'),
            'f_venc' : request.data.get('f_venc'),
            'id_usuario' : request.data.get('id_usuario'),
        }

        serializer = TarjetaSerializers(instance = instance, data=data, partial = True)
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
    
