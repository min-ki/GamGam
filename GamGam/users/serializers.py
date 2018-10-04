from rest_framework import serializers
from GamGam.travel.serializers import TravelSerializer, UserProfileTravelSerializer
from .models import User
from GamGam.travel.models import Travel
class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'name',
            'gender',
            'phone'
        )


class UserProfileSerializer(serializers.ModelSerializer):
    
    travel = UserProfileTravelSerializer(many=True, read_only=True)
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'username',
            'name',
            'followers_count',
            'following_count',
            'following',
            'travel'
        )

    def get_following(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj in request.user.following.all():
                return True
        return False

class UserPlanSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Travel
        fields = '__all__'