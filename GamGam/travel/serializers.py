from rest_framework import serializers
from .models import Travel, TravelPlan, Image
from GamGam.users import models as user_models
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            'id',
            'file',
            'location',
        )

class TravelPlanSerializer(serializers.ModelSerializer):
    
    plan_images = ImageSerializer(many=True)

    class Meta:
        model = TravelPlan
        fields = '__all__'

class FeedUserserializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_models.User
        fields = (
            'username',
        )

# todo: 여행계획 리스트 직렬화
class TravelSerializer(TaggitSerializer, serializers.ModelSerializer):

    owner = FeedUserserializer()
    status = serializers.CharField(source='get_status_display') # Model.get_FOO_display를 통해 human-readable 값을 불러올수 있음
    travel_plan = TravelPlanSerializer(many=True)
    tags = TagListSerializerField()
    
    class Meta:
        model = Travel
        fields = (
            'id',
            'main_image',
            'title',
            'status',
            'owner',
            'price',
            'travel_plan',
            'tags',
        )

class CreateTravelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Travel
        fields = (
            'id',
            'title',
            'status',
            'owner'
        )

class UpdateTravelSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField()

    class Meta:
        model = Travel
        fields = ('title', 'status', 'owner')



class CreateTravelPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = TravelPlan
        fields = (
            'id',
            'title', 
            'content'
        )

class UserProfileTravelSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = Travel
        fields = (
            'id',
            'title',
            'status'
        )
