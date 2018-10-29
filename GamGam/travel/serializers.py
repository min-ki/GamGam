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
    
    plan_images = ImageSerializer(
        read_only=True,
        many=True
    )
    
    # travel = serializers.ReadOnlyField()

    class Meta:
        model = TravelPlan

        fields = (
            'id',
            'title',
            'content',
            'price',
            'travel',
            'travel_day',
            'plan_images',
        )

class FeedUserserializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_models.User
        fields = (
            'username',
        )

class TravelSerializer(TaggitSerializer, serializers.ModelSerializer):

    """
    Feed 페이지에 사용되는 시리얼라이져
    """

    owner = FeedUserserializer(read_only=True) # 사용자
    status = serializers.CharField(
        read_only=True, 
        source='get_status_display'
    ) # Model.get_FOO_display를 통해 human-readable 값을 불러올수 있음
    travel_plan = TravelPlanSerializer(many=True) # 여행계획
    tags = TagListSerializerField() # 태그
    main_image = serializers.FileField(read_only=True)

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
            'travel_region',
            'tags',
            'start_at',
            'end_at',
        )

    def create(self, validate_data):
        travel_plan = validate_data.pop('travel_plan') # 여행 계획 리스트
        tags = validate_data.pop('tags') # 태그 리스트 
        travel = Travel.objects.create(**validate_data) # 여행 instance 생성
        travel.tags.set(*tags) # 태그 저장

        for plan in travel_plan:
            plan = TravelPlan.objects.create(**plan)
            plan.travel = travel
            travel.travel_plan.add(plan)
            print(travel)
        return travel

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
