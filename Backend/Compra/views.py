from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Compra.models import Compra
from Compra.serializers import ComprasSerializers


# Create your views here.

class Compra_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args, **kwargs):
        compra = Compra.objects.all()
        serializer = ComprasSerializers(compra,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request,*args, **kwargs):
        serializer = ComprasSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class Compra_id(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Compra.objects.get(id=id)
        except Compra.DoesNotExist:
            return None

    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ComprasSerializers(instance = instance, data=request.data, partial = True)
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
    
