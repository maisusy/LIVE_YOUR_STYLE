from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from Categoria_producto.models import Cat_prod
from Categoria_producto.serializers import CatProdSerializer


class cat_prod_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args, **kwargs):
        cat_prod = Cat_prod.objects.all()
        serializer = CatProdSerializer(cat_prod,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request,*args, **kwargs):

        serializer = CatProdSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
class cat_prod_id(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,id):
        try:
            return  Cat_prod.objects.get(id=id)
        except Cat_prod.DoesNotExist:
            return None
        
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CatProdSerializer(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "No exite el objeto"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
        return Response(
            {"res": "Objeto eliminado"},
            status=status.HTTP_200_OK
        )
    
