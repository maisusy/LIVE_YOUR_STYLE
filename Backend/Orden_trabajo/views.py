from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Orden_trabajo.models import Orden_Trabajo
from Orden_trabajo.serializers import Orden_trabajoSerializers


class Orden_Trabajo_lista(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args,**kwargs):
        ot = Orden_Trabajo.objects.all()
        serializer = Orden_trabajoSerializers(ot,many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self,request,*args,**kwargs):
        serializer = Orden_trabajoSerializers(data=request.data)
         
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Orden_Trabajo_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Orden_Trabajo.objects.get(id=id)
        except Orden_Trabajo.DoesNotExist:
            return None

    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = Orden_trabajoSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Eliminar
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
    
