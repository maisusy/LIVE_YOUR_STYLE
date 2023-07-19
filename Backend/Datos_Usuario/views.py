from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Datos_Usuario.models import Datos_Usuario
from Datos_Usuario.serializers import Datos_UsuarioSerializers


# Create your views here.

class Datos_Usuario_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #lista 
    def get(self,request,*args, **kwargs):
        usuario = Datos_Usuario.objects.all()
        serializer = Datos_UsuarioSerializers(usuario,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Crear
    def post(self,request,*args, **kwargs):
        data = {
            'cuit' : request.data.get('cuit'),
            'razon_social' : request.data.get('razon_social'),
            'obs' : request.data.get('obs'),
        }

        serializer = Datos_UsuarioSerializers(dat=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.errors,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Datos_Usuario_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Datos_Usuario.objects.get(id=id)
        except Datos_Usuario.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = Datos_UsuarioSerializers(instance)
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
            'cuit' : request.data.get('cuit'),
            'razon_social' : request.data.get('razon_social'),
            'obs' : request.data.get('obs'),
        }
        serializer = Datos_UsuarioSerializers(instance = instance, data=data, partial = True)
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
    
