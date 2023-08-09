from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from Factura.models import Factura ,FacturaInsumo
from Factura.serializers import FacturaSerializer,FacturaInsumoSerializer


# Create your views here.

class Factura_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #lista 
    def get(self,request,*args, **kwargs):
        try:
            facturas = Factura.objects.all()
            serializer = FacturaSerializer(facturas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #Crear
    def post(self,request,*args, **kwargs):

        data = {
            "fecha_alta" : request.data.get("fecha_alta"),
            "fecha_registro" : request.data.get("fecha_registro"),
            "nro_factura" : request.data.get("nro_factura"),
            "nro_comprobante" : request.data.get("nro_comprobante"),
            "nro_p_vta" : request.data.get("nro_p_vta"),
            "id_proveedor" : request.data.get("id_proveedor"),
            "id_compra" : request.data.get("id_compra"),
        }

        serializer = FacturaSerializer(data=data)
        
        if serializer.is_valid():
            factura = serializer.save()

            insumo_data = request.data.get("insumos", [])

            for insumo in insumo_data:

                data_2 = {
                    "id_fact":factura.id,
                    "id_insumo":insumo.get("id_insumo"),
                    "cant":insumo.get("cant"),
                    "costo_total":insumo.get("costo_total")
                }

                fi_s = FacturaInsumoSerializer(data=data_2)
                if fi_s.is_valid():
                    fi_s.save()
                else: 
                    return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    
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
        
        data = {
            "fecha_registro" : request.data.get("fecha_registro"),
            "nro_factura" : request.data.get("nro_factura"),
            "nro_comprobante" : request.data.get("nro_comprobante"),
            "nro_p_vta" : request.data.get("nro_p_vta"),
            "id_proveedor" : request.data.get("id_proveedor"),
            "id_compra" : request.data.get("id_compra")
        }

        serializer = FacturaSerializer(instance = instance, data=data, partial = True)
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
    
