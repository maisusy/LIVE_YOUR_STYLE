from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Color.models import Color
from Color.serializers import ColorSerializers


class color_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args, **kwargs):
        color = Color.objects.all()
        serializer = ColorSerializers(color,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
   
    def post(self,request,*args, **kwargs):
        serializer = ColorSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Color_id(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Color.objects.get(id=id)
        except Color.DoesNotExist:
            return None

    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ColorSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "No existe el objeto"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
        return Response(
            {"res": "Objecto Eliminado"},
            status=status.HTTP_200_OK
        )
    
