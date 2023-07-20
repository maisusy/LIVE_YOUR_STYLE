from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Venta.models import Venta
from Venta.serializers import VentaSerializers


class Venta_lista(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #lista
    def get(self,request,*args,**kwargs):
        vta = Venta.objects.all()
        serializer = VentaSerializers(vta,many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    #cREAR
    def post(self,request,*args,**kwargs):
        data = {
            'id_usuario' : request.data.get('id_usuario'),
            'id_correo' : request.data.get('id_correo'),
            'id_direccion' : request.data.get('id_direccion'),
            'id_telefono' : request.data.get('id_telefono'),
            'precio_total' : request.data.get('precio_total'),
            'medio_pago' : request.data.get('medio_pago'),
            'estado' : request.data.get('estado'),
            'fecha' : request.data.get('fecha'),
        }

        serializer = VentaSerializers(data=data)
         
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Venta_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Venta.objects.get(id=id)
        except Venta.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = VentaSerializers(instance)
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
            'id_usuario' : request.data.get('id_usuario'),
            'id_correo' : request.data.get('id_correo'),
            'id_direccion' : request.data.get('id_direccion'),
            'id_telefono' : request.data.get('id_telefono'),
            'precio_total' : request.data.get('precio_total'),
            'medio_pago' : request.data.get('medio_pago'),
            'estado' : request.data.get('estado'),
            'fecha' : request.data.get('fecha'),
        }

        serializer = VentaSerializers(instance = instance, data=data, partial = True)
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
    
