from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from Datos_Usuario.models import Datos_Usuario
from Datos_Usuario.serializers import Datos_UsuarioSerializers, UserSerializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import PBKDF2PasswordHasher


class CambioContraseña(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def put(self, request, username, *args, **kwargs):
        instance = self.get_object(username)

        hasher = PBKDF2PasswordHasher()
        if not instance:
            return Response(
                {"res": "No exite el objeto"}, status=status.HTTP_400_BAD_REQUEST
            )

        data = {"password": make_password(request.data.get("password"))}
        serializer = UserSerializers(instance=instance, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Datos_Usuario_crear(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    queryset = Datos_Usuario.objects.none()

    def post(self, request, *args, **kwargs):
        user = User.objects.create_user(
            username=request.data.get("usuario"),
            password=request.data.get("contraseña"),
            email=request.data.get("email"),
        )
        data = {
            "usuario": user.id,
            "nombres": request.data.get("nombres"),
            "apellidos": request.data.get("apellidos"),
            "fecha_alta": request.data.get("fecha_alta"),
            "dni": request.data.get("dni"),
            "nivel": request.data.get("nivel"),
            "telefono": request.data.get("telefono"),
        }
        _serializer = Datos_UsuarioSerializers(data=data)

        if _serializer.is_valid():
            return Response(_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Datos_Usuario_lista(APIView):
    queryset = Datos_Usuario.objects.none()
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        usuario = Datos_Usuario.objects.all()
        _serializer = Datos_UsuarioSerializers(usuario, many=True)
        return Response(_serializer.data, status=status.HTTP_200_OK)


class Datos_Usuario_id(APIView):
    queryset = Datos_Usuario.objects.none()
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Datos_Usuario.objects.get(id=id)
        except Datos_Usuario.DoesNotExist:
            return None

    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "No exite el objeto"}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = Datos_UsuarioSerializers(
            instance=instance, data=request.data, partial=True
        )
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "El objeto no existe"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        instance.delete()
        return Response({"res": "Objeto eliminado"}, status=status.HTTP_200_OK)
