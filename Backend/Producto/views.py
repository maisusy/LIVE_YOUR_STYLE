from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny  # NOQA
from rest_framework.response import Response
from rest_framework import status
from Producto.serializers import ProductoSerializers,ImagenProductoSerializers,GetProductoSerializers
from Producto.models import Producto,ImagenesProductos


class Producto_imagen(APIView):
    queryset = Producto.objects.none()
    permission_classes = (IsAuthenticated,)

    def post(self,request,id, *args, **kwargs):
            producto_id = id

            request.data['producto'] = producto_id

            print(request.data)
            _serializer = ImagenProductoSerializers(data=request.data)  # NOQA
            
            if _serializer.is_valid():
                _serializer.save(producto_id=producto_id)

                return Response(_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
            else:
                return Response(_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # NOQA


class Producto_imagen_lista(APIView):
    queryset = Producto.objects.none()
    permission_classes = [AllowAny]
    authentication_classes = ()
    
    def get(self,request, *args, **kwargs):
        imgprod = ImagenesProductos.objects.all()
        serializer = ImagenProductoSerializers(imgprod,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

        
class Producto_list(APIView):
    queryset = Producto.objects.none()
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request, *args, **kwargs):

        _serializer = ProductoSerializers(data=request.data)  # NOQA
        
        if _serializer.is_valid():
            _serializer.save(color = request.data.get('color'))

            return Response(_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # NOQA
    
    def get(self,request, *args, **kwargs):
        prod = Producto.objects.all()
        
        serializer = GetProductoSerializers(prod,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class Producto_id(APIView):

    queryset = Producto.objects.none()
    permission_classes = (IsAuthenticated,)


    def get_object(self,id):
        try:
            return  Producto.objects.get(id=id)
        except Producto.DoesNotExist:
            return None

    def put(self,request,id,*args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {'res':'No exite el objeto'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProductoSerializers(instance = instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save(color = request.data.get('color'))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        
        if not instance:
            return Response(
                {"res": "No existe el objeto"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        imagenes_productos = ImagenesProductos.objects.filter(producto=id)

        # Elimina cada imagen asociada
        for img_producto in imagenes_productos:
            img_producto.imagen.delete()
            img_producto.delete()

        # Finalmente, elimina la instancia del producto
        instance.delete()

        return Response(
            {"res": "Objeto Eliminado"},
            status=status.HTTP_200_OK
        )
    
