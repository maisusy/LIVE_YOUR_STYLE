from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # NOQA
from rest_framework import status
from Datos_Usuario.models import Datos_Usuario
from Datos_Usuario.serializers import Datos_UsuarioSerializers


# Create your views here.

class Datos_Usuario_lista(APIView):

    queryset = Datos_Usuario.objects.none()
    permission_classes = (IsAuthenticated,)

    def post(self,request,*args, **kwargs):
        data = {
            "nombres" : request.data.get("nombres"),
            "apellidos" : request.data.get("apellidos"),
            "fecha_alta" : request.data.get("fecha_alta"),
            "dni" : request.data.get("dni"),
            "cuit" : request.data.get("cuit")
        }

        _serializer = Datos_UsuarioSerializers(data=data)

        if _serializer.is_valid():
            _serializer.save(dir = request.data.get('dir'))
            return Response(_serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    def get(self,request,*args, **kwargs):
        usuario = Datos_Usuario.objects.all()
        _serializer = Datos_UsuarioSerializers(usuario,many=True)
        return Response(_serializer.data,status=status.HTTP_200_OK)



class Datos_Usuario_id(APIView):


    queryset = Datos_Usuario.objects.none()
    permission_classes = (IsAuthenticated,)

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
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = Datos_UsuarioSerializers(instance)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #UPDATE
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "nombres" : request.data.get("nombres"),
            "apellidos" : request.data.get("apellidos"),
            "fecha_alta" : request.data.get("fecha_alta"),
            "dni" : request.data.get("dni"),
            "cuit" : request.data.get("cuit")
        }
        serializer = Datos_UsuarioSerializers(instance = instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save(dir = request.data.get("dir"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
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
    
