from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from . import models, serializers
import requests, json

# GET /travel/
class TravelListView(APIView):
    
    def get(self, request, format=None):
        """
        모든 여행지 리스트 반환 -> 추억하기 상태있는 게시물만
        """
        user = request.user
        
        travel_list = models.Travel.objects.filter(status="2") # 추억하기 게시물만 필터링
        serializer = serializers.TravelSerializer(travel_list, many=True, context={'request' : request})

        return Response(serializer.data)

    def post(self, request, format=None):
        """
        여행 계획 생성
        """
        user = request.user
        serializer = serializers.TravelSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=user, status="0")
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=400)


class TravelDetailView(APIView):

    def get(self, request, pk, format=None):
        """
        여행지 상세보기 
        """
        try:
            travel = get_object_or_404(models.Travel, pk=pk)
        except models.Travel.DoesNotExist:
            raise Http404("Not founded")

        serializer = serializers.TravelSerializer(travel)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        """
        여행지 업데이트
        """
        user = request.user

        travel = models.Travel.objects.get(
            owner=user,
            pk=pk
        )

        travel.title = request.data['title']
        travel.status = request.data['status']

        serializer = serializers.UpdateTravelSerializer(travel, data=request.data)

        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(data=serializer.data, status=204)
        else:
            return Response(data=serializer.errors, status=400)

    def delete(self, request, pk, format=None):
        
        """
        여행지 삭제
        """

        user = request.user

        try:
            travel = models.Travel.objects.get(
                owner=user,
                pk=pk
            )
            travel.delete()

            return Response(status=204)
        except Travel.DoesNotExist:
            return Response(status=304)

class TravelPlanListView(APIView):

    def get(self, request, pk, format=None):
        """
        여행지 세부 계획 리스트
        """
        user = request.user
        travel = models.Travel.objects.get(pk=pk)

        plan_list = travel.travelplan_set.all()

        serializer = serializers.TravelPlanSerializer(plan_list, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        """
        여행지 세부 계획 생성
        """
        user = request.user

        try:
            travel = models.Travel.objects.get(pk=pk)
        except models.Travel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.TravelPlanSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(travel=travel)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=304)

    def put(self, request, pk, format=None):
        """
        여행지 세부 계획 업데이트
        """
        user = request.user


        try:
            travel = models.Travel.objects.get(pk=pk)
        except models.Travel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        plan_list = models.TravelPlan.objects.filter(travel=travel)
        print(plan_list)

        serializer = serializers.TravelPlanSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(travel=travel)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=304)


class TravelApi(APIView):

    API_KEY = "z4gACM%2FayWbDfCPYqKi%2FDzhIir%2B4KK%2BWaimEYcEIZMMqbhmDfySxMbaCACDmtZkDEhXXdm0uTIbSjfRG%2FNE%2BnA%3D%3D"
    URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey="+ API_KEY +"&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json"
    URL2 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey="+ API_KEY +"&areaCode=35&MobileOS=ETC&MobileApp=AppTest&_type=json"
    def get(self, request, format=None):
        response = requests.get(self.URL2)
        data = json.loads(response.text)
        print(data)
        return Response(data=data['response']['body'])        
