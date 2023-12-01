from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny  # NOQA
from rest_framework.response import Response
from rest_framework import status
from Producto.serializers import (
    ProductoSerializers,
    ImagenProductoSerializers,
    GetProductoSerializers,
    ProductoInsumoSerializers
)
from Producto.models import Producto, ImagenesProductos,ProductoInsumo
from django.db import transaction
import os
from django.conf import settings

class Producto_imagen(APIView):
    queryset = Producto.objects.none()
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return ImagenesProductos.objects.get(producto_id=id)
        except ImagenesProductos.DoesNotExist:
            return None

    def post(self, request, id, *args, **kwargs):
        instance = self.get_object(id)

        serializer = ImagenProductoSerializers(data=request.data)

        if instance:
            try:
                with transaction.atomic():
                    # Obtén la ruta del archivo
                    file_path = os.path.join(settings.MEDIA_ROOT, str(instance.imagen))

                    # Elimina la instancia de la base de datos
                    instance.delete()

                    # Elimina el archivo del sistema de archivos
                    if os.path.exists(file_path):
                        os.remove(file_path)

                    if serializer.is_valid():
                        serializer.save(producto_id=id)
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(
                            serializer.errors, status=status.HTTP_400_BAD_REQUEST
                        )
            except Exception as e:
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            if serializer.is_valid():
                serializer.save(producto_id=id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Producto_imagen_lista(APIView):
    queryset = Producto.objects.none()
    permission_classes = [AllowAny]
    authentication_classes = ()

    def get(self, request, *args, **kwargs):
        imgprod = ImagenesProductos.objects.all()
        serializer = ImagenProductoSerializers(imgprod, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Producto_list(APIView):
    queryset = Producto.objects.none()
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        try:
            serializer = ProductoSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save(
                    insumos=request.data.get("insumos"), color=request.data.get("color")
                )

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, *args, **kwargs):
        prod = Producto.objects.all()

        serializer = GetProductoSerializers(prod, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Producto_id(APIView):
    queryset = Producto.objects.none()
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Producto.objects.get(id=id)
        except Producto.DoesNotExist:
            return None

    @transaction.atomic  # Decorador para asegurar una transacción atómica
    def put(self, request, id, *args, **kwargs):
        try:
            instance = self.get_object(id)
            if not instance:
                return Response(
                    {"res": "No existe el objeto"}, status=status.HTTP_400_BAD_REQUEST
                )

            # Eliminar instancias antiguas de ProductoInsumo
            producto_insumo = ProductoInsumo.objects.filter(producto=id)
            producto_insumo.delete()

            # Crear nuevas instancias de ProductoInsumo
            insumos_data = request.data.get("insumos", [])
            for insumo_data in insumos_data:
                insumo_producto_serializer = ProductoInsumoSerializers(
                    data=insumo_data
                )
                if insumo_producto_serializer.is_valid():
                    insumo_producto_serializer.save(producto=instance)
                else:
                    # Manejar errores de validación de ProductoInsumo
                    return Response(
                        {"res": "Error en la validación de ProductoInsumo",
                         "errors": insumo_producto_serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Guardar el producto con el resto de los datos
            serializer = ProductoSerializers(
                instance=instance, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save(color=request.data.get("color"))
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"res": f"Error en la vista: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)

        if not instance:
            return Response(
                {"res": "No existe el objeto"}, status=status.HTTP_400_BAD_REQUEST
            )

        imagenes_productos = ImagenesProductos.objects.filter(producto=id)

        for img_producto in imagenes_productos:
            img_producto.imagen.delete()
            img_producto.delete()

        instance.delete()

        return Response({"res": "Objeto Eliminado"}, status=status.HTTP_200_OK)
