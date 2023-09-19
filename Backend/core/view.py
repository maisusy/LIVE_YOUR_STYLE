


from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self,request,*arg,**kwargs):
        response = super().post(request,*arg, **kwargs)
        token = response.data.get('token')
        return Response({'token':token},status=HTTP_200_OK)