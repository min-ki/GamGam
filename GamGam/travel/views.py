from rest_framework.views import APIView
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TravelSerializer, TravelPlanSerializer
from .models import Travel, TravelPlan

# 최신 Travel 살펴보기
class ExploreTravels(APIView):
    
    def get(self, request, format=None):

        last_five = models.Travel.objects.all().order_by('-date_joined')[:5]
        serializer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)



class TravelViewSet(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer

@api_view(['GET', 'POST'])
def travel_plan_list(request, pk, format=None):
    if request.method == 'GET':
        travel_plan = TravelPlan.objects.all()
        serializer = TravelPlanSerializer(travel_plan, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        data['travel'] = request.user.id

        serializer = TravelPlanSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
