from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
 
from Marca.models import Marca
from Marca.serializers import MarcaSerializer


class marca_lista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        marca = Marca.objects.all()
        serializer = MarcaSerializer(marca, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        serializer = MarcaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class marca_id(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Marca.objects.get(id=id)
        except Marca.DoesNotExist:
            return None
    # 2. Retrieve
    def get(self, request, id, *args, **kwargs):
        todo_instance = self.get_object(id)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = MarcaSerializer(todo_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
     # 3. Update
    def put(self, request, id, *args, **kwargs):
        todo_instance = self.get_object(id)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = MarcaSerializer(instance = todo_instance, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # 4. Delete
    def delete(self, request, id, *args, **kwargs):

        todo_instance = self.get_object(id)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        todo_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
    