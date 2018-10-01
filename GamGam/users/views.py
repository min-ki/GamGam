from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.schemas import SchemaGenerator
from rest_framework_swagger import renderers
from . import models, serializers

class UserList(APIView):

    permission_classes = [AllowAny]
    renderer_classes = [
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer,
        JSONRenderer
    ]

    def get(self, request, format=None):
        users = models.User.objects.all()
        serializer = serializers.UserListSerializer(users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserProfile(APIView):
    
    permission_classes = [AllowAny]
    renderer_classes = [
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer,
        JSONRenderer
    ]
    
    def get_user(self, pk):
        try:
            found_user = models.User.objects.get(pk=pk)
            return found_user
        except models.User.DoesNotExist:
            return None

    # todo: TimeLine 그리기 위해서 User의 TravelList를 받아와야함
    def get(self, request, pk, format=None):
        
        found_user = self.get_user(pk)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user, context={'request': request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):

        user = request.user
        found_user = self.get_user(pk)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        elif found_user.username != user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = serializers.UserProfileSerializer(
                found_user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


