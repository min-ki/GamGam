from django.db import models
from GamGam.users.models import User

# todo: 비용 모델을 만들어서 여행 경비 필드 생성하기
# todo: Travel의 외래키 User 지정하기
# todo: 
class Travel(models.Model):
    
    TRAVEL_STATUS_CHOICE = (
        ("0", '시작하기'),
        ("1", '여행 중'),
        ("2", '추억하기'),
    )

    title = models.CharField(max_length=50) # 여행 계획 제목
    status = models.CharField(max_length=1, choices=TRAVEL_STATUS_CHOICE) # 여행 상태
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

# todo: 여행 계획 리스트를 만들기위해서는 각 리스트를 담아야할 클래스 있어야함 -> TravelPlan
class TravelPlan(models.Model):

    title = models.CharField(max_length=50) # 세부 여행 계획 제목
    content = models.TextField()
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE)

    def __str__(self):
        return self.title