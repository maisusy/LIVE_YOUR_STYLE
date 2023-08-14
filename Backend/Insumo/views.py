from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from Insumo.models import Insumo
from Insumo.serializers import InsumoSerializers




class Insumo_lista(APIView):
    queryset = Insumo.objects.none()
    permission_classes = (IsAuthenticated,)
    
    def post(self,request,*args, **kwargs):
        _serializer = InsumoSerializers(data=request.data)

        if _serializer.is_valid():
            _serializer.save(color = request.data.get('color'))
            _serializer.save(obs = request.data.get('obs'))
            return Response(_serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(_serializer.errors , status = status.HTTP_400_BAD_REQUEST)    
    #lista 
    def get(self,request,*args, **kwargs):
        insumo = Insumo.objects.all()
        serializer = InsumoSerializers(insumo,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class Insumo_id(APIView):

    queryset = Insumo.objects.none()
    permission_classes = (IsAuthenticated,)

    #obtener uno
    def get_object(self,id):
        try:
            return  Insumo.objects.get(id=id)
        except Insumo.DoesNotExist:
            return None
        
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        _serializer = InsumoSerializers(instance)
        return Response(_serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        _serializer = InsumoSerializers(instance = instance, data=request.data, partial = True)
        if _serializer.is_valid():
            _serializer.save(color = request.data.get("color"))
            _serializer.save(obs = request.data.get('obs'))
            return Response(_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    
