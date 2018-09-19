from rest_framework import serializers
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = (
            'username',
            'name',
            'followers_count',
            'following_count',
        )