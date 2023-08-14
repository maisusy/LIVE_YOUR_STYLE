from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from Insumo.models import Insumo
from Factura.models import Factura , FacturaInsumo
from Factura.serializers import FacturaSerializer

# Create your views here.

class Factura_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

     
    def get(self, request, *args, **kwargs):
        try:
            facturas = Factura.objects.all()
            serializer = FacturaSerializer(facturas, many=True)
            print('Factutas Serializers: ', serializer.data)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

    def post(self,request,*args, **kwargs):
        try:

            serializer = FacturaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(insumos = request.data.get('insumos'))

                return Response(serializer.data,status=status.HTTP_201_CREATED) 
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class Factura_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    #obtener uno
    def get_object(self,id):
        try:
            return  Factura.objects.get(id=id)
        except Factura.DoesNotExist:
            return None
    def get(self,requestt,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = FacturaSerializer(instance)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #UPDATE
    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res":"No exite el objeto"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = FacturaSerializer(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save(insumos = request.data.get("insumos"))
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
    
