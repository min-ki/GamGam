from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
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
        travel = models.Travel.objects.get(pk=pk)
        serializer = serializers.UpdateTravelSerializer(travel, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(data=serializer.data, status=200)
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

class TravelPlanDetailView(APIView):
    
    def get(self, request, plan_pk, format=None):
        """
        여행지 세부 계획 상세보기
        """
        try:
            plan = get_object_or_404(models.TravelPlan, plan_pk=plan_pk)
        except models.TravelPlan.DoesNotExist:
            raise Http404("Not founded")

        serializer = serializers.TravelPlanSerializer(plan)
        return Response(serializer.data)

    def put(self, request, pk, plan_pk, format=None):
        """
        여행지 세부 계획 업데이트
        """
        try:
            plan = models.TravelPlan.objects.get(id=plan_pk)
        except models.TravelPlan.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UpdateTravelPlanSerializer(plan, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(plan=plan)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=304)

class LikeTravel(APIView):
    
    # GET /travel/(?<P>travel_id)/likes
    def get(self, request, travel_id, format=None):

        likes = models.Like.objects.filter(travel__id=travel_id)    
        like_creator_ids = likes.values('creator_id')
        users = user_models.User.objects.filter(id__in=like_creator_ids)

        serializer = user_serializers.ListUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    # POST /travel/(?<P>travel_id)/likes
    def post(self, request, travel_id, format=None):

        user = request.user
        
        try:
            found_travel = models.Travel.objects.get(id=travel_id)
        except models.Travel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                travel=found_travel
            ) 

            return Response(status=status.HTTP_304_NOT_MODIFIED)
            
        except models.Like.DoesNotExist:
            
            new_like = models.Like.objects.create(
                creator=user,
                travel = found_travel
            )

            new_like.save()
        
            return Response(status=status.HTTP_201_CREATED)

class UnLikeTravel(APIView):

    def delete(self, request, travel_id, format=None):

        user = request.user
        
        try:
            found_travel = models.Travel.objects.get(id=travel_id)
        except models.Travel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                travel=found_travel
            )
            preexisiting_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)

class TodoListView(APIView):

    def get(self, request, travel_id, format=None):

        user = request.user
        todo = models.Todo.objects.filter(travel__id=travel_id, creator=user)
        serializer = serializers.TodoSerializer(todo, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, travel_id, format=None):
        """
        체크리스트 아이템 생성
        """
        user = request.user
        travel = models.Travel.objects.get(id=travel_id)
        serializer = serializers.TodoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(travel=travel, creator=user)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=400)

class TodoDetailView(APIView):

    def put(self, request, travel_id, todo_id, format=None):
        """
        체크리스트 업데이트
        """

        user = request.user
        travel = models.Travel.objects.get(id=travel_id)

        try:
            todo = models.Todo.objects.get(id=todo_id)
        except models.Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.TodoSerializer(todo, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(travel=travel, creator=user)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=304)

    def delete(self, request, travel_id, todo_id, format=None):
    
        user = request.user
        
        try:
            todo = models.Todo.objects.get(id=todo_id, creator=user) # 
            todo.delete() # Item 삭제 
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class MainImageView(APIView):

    """
        Description: 메인 이미지 업로딩 및 삭제
    """

    parser_classes = (MultiPartParser, FileUploadParser, )

    def put(self, request, travel_id, format=None):
        
        user = request.user
        travel = models.Travel.objects.get(id=travel_id)
        main_image = request.FILES.get('main_image', False)

        serializer = serializers.MainImageUpdateSerializer(travel, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save(main_image=main_image, creator=user, travel=travel)
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=304)

    def delete(self, request, travel_id, format=None):
        pass
        

API_KEY = "z4gACM%2FayWbDfCPYqKi%2FDzhIir%2B4KK%2BWaimEYcEIZMMqbhmDfySxMbaCACDmtZkDEhXXdm0uTIbSjfRG%2FNE%2BnA%3D%3D"

# 숙박정보, 여행정뷰 받아오기
class TravelApi(APIView):

    URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey="+ API_KEY +"&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json"
    URL2 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey="+ API_KEY +"&areaCode=35&MobileOS=ETC&MobileApp=AppTest&_type=json"

    # 지역코드 검색후
    # 해당 지역 숙박정보 리스트 받아오기
    # 해당 지역 관광정보 리스트 받아오기 
    
    detail_content = " http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=z4gACM%2FayWbDfCPYqKi%2FDzhIir%2B4KK%2BWaimEYcEIZMMqbhmDfySxMbaCACDmtZkDEhXXdm0uTIbSjfRG%2FNE%2BnA%3D%3D&contentId=2386828&defaultYN=Y&MobileOS=ETC&MobileApp=AppTesting&_type=json"
    # 숙박정보
    stay_url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay?ServiceKey=z4gACM%2FayWbDfCPYqKi%2FDzhIir%2B4KK%2BWaimEYcEIZMMqbhmDfySxMbaCACDmtZkDEhXXdm0uTIbSjfRG%2FNE%2BnA%3D%3D&MobileOS=ETC&MobileApp=GamGam&_type=json"

    def get(self, request, travel_id, format=None):

        ## 해당 여행 게시글의 여행지를 받아와 관광정보 추천
        ## 매 조회시마다 랜덤으로 5개의 값만 추출
        travel = models.Travel.objects.get(id=travel_id)

        travel_region = travel.korea_travel_region

        # 페이지의 끝을 알아내서 해당 범위에서 하나의 page만 요청보내서 출력
        # pageNo
        from random import randint
        
        pageNo = randint(1, 300)

        area_based_list = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=" + API_KEY + "&areaCode=" + travel_region + "&numOfRows=5" + "&pageNo=" + str(pageNo) + "&MobileOS=ETC&MobileApp=AppTest&_type=json"

        response = requests.get(area_based_list)
        data = json.loads(response.text)
        
        return Response(data=data['response']['body'])        
