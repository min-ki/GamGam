from rest_framework import serializers
from .models import Travel, TravelPlan
from GamGam.users import models as user_models

# todo: 여행계획 리스트 직렬화
class TravelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Travel
        fields = '__all__'

# todo: 여행계획 세부내용 직렬화

class TravelPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = TravelPlan
        fields = '__all__'
