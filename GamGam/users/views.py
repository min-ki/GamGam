from rest_framework.views import APIView
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import User
from .permissions import IsUserOrReadOnly
from .serializers import CreateUserSerializer, UserSerializer

class UserProfile(APIView):
    
    def get_user(self, username):

        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, formant=None):

        found_user = self.get_user(username)
        
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def put(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)
        
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        else:

            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)

            if serializer.is_valid():

                serializer.save()
                
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
