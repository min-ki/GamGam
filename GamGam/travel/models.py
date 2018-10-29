from django.db import models
from GamGam.users.models import User
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import Thumbnail, ResizeToFill

# todo: 비용 모델을 만들어서 여행 경비 필드 생성하기
# todo: Travel의 외래키 User 지정하기
# todo: 
class Travel(models.Model):
    
    class Meta:
        ordering = ['-updated_at']

    TRAVEL_STATUS_CHOICE = (
        ("0", '시작하기'),
        ("1", '여행 중'),
        ("2", '추억하기'),
    )

    main_image = ProcessedImageField(
        upload_to='uploads/%Y/%m/%d/',
        processors=[ResizeToFill(800, 800)],
        format='JPEG',
        options={'quality': 60}
    )

    title = models.CharField(max_length=50) # 여행 계획 제목
    status = models.CharField(max_length=1, choices=TRAVEL_STATUS_CHOICE) # 여행 상태
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='travel')
    price = models.IntegerField(default=0) # 여행 비용
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    travel_region = models.CharField(max_length=30) # 여행 국가
    start_at = models.DateField() # 여행 시작일
    end_at = models.DateField()  # 여행 종료일

    tags = TaggableManager() # 태그

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return self.title

# todo: 여행 계획 리스트를 만들기위해서는 각 리스트를 담아야할 클래스 있어야함 -> TravelPlan
class TravelPlan(models.Model):

    title = models.CharField(max_length=50) # 세부 여행 계획 제목
    content = models.TextField()
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE, related_name='travel_plan')
    travel_region = models.CharField(max_length=30)  # 각 계획의 여행 지역
    travel_day = models.DateField() # 여행 일
    price = models.IntegerField(default=0) # 각각 계획 마다의 비용

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return self.title

class Image(models.Model):
    
    """ Image Model """
    
    file = ProcessedImageField(
        upload_to='uploads/%Y/%m/%d/',
        processors=[ResizeToFill(800, 800)],
        format='JPEG',
        options={'quality': 60}
    )
    
    thumbnail = ImageSpecField(
        source='file',
        processors=[Thumbnail(150, 150)],
        format='JPEG',
        options={'quality': 60})

    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.PROTECT, null=True, related_name='images')
    plan = models.ForeignKey(TravelPlan, on_delete=models.PROTECT, null=True, related_name='plan_images')
    tags = TaggableManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at']
