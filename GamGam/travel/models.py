from django.db import models
from GamGam.users import models as user_models 
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import Thumbnail, ResizeToFill
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Travel(TimeStampedModel):
    
    class Meta:
        ordering = ['-updated_at']

    TRAVEL_STATUS_CHOICE = (
        ("0", '시작하기'),
        ("1", '여행 중'),
        ("2", '추억하기'),
    )

    TRAVEL_REGION = (
        # 지역코드와 지역명 매칭하기
        ("1", "서울"),
        ("2", "인천"),
        ("3", "대전"),
        ("4", "대구"),
        ("5", "광주"),
        ("6", "부산"),
        ("7", "울산"),
        ("8", "세종특별자치시"),
        ("31", "경기도"),
        ("32", "강원도"),
        ("33", "충청북도"),
        ("34", "충청남도"),
        ("35", "경상북도"),
        ("36", "경상남도"),
        ("37", "전라북도"),
        ("38", "전라남도"),
        ("39", "제주도"),
    )

    main_image = ProcessedImageField(
        upload_to='uploads/%Y/%m/%d/',
        processors=[ResizeToFill(800, 800)],
        format='JPEG',
        options={'quality': 60}
    )

    title = models.CharField(max_length=50, blank=True, null=True) # 여행 계획 제목
    status = models.CharField(max_length=1, choices=TRAVEL_STATUS_CHOICE, default="0") # 여행 상태
    owner = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name='travel')
    price = models.IntegerField(default=0, blank=True) # 여행 비용
   

    travel_region = models.CharField(max_length=30, blank=True, null=True) # 여행 국가
    korea_travel_region = models.CharField(max_length=2, choices=TRAVEL_REGION, default="0")
    start_at = models.DateField() # 여행 시작일
    end_at = models.DateField()  # 여행 종료일

    tags = TaggableManager() # 태그

    @property
    def like_count(self):
        return self.travels.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return self.title

# todo: 여행 계획 리스트를 만들기위해서는 각 리스트를 담아야할 클래스 있어야함 -> TravelPlan
class TravelPlan(models.Model):

    TRAVEL_TRANSPORTATION_CHOICE = (
        ("0", '도보'),
        ("1", '자전거'),
        ("2", '버스'),
        ("3", '지하철'),
        ("4", '비행기'),
        ("5", '자차'),
        ("6", '배'),
    )

    title = models.CharField(max_length=50, blank=True, null=True) # 세부 여행 계획 제목
    content = models.TextField(blank=True, null=True)
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE, related_name='travel_plan', null=True)
    travel_region = models.CharField(max_length=30, blank=True, null=True)  # 각 계획의 여행 지역
    travel_day = models.DateField() # 여행 일
    price = models.IntegerField(default=0, blank=True, null=True) # 각각 계획 마다의 비용
    Transportation = models.CharField(max_length=2, choices=TRAVEL_TRANSPORTATION_CHOICE, default="0")

    class Meta:
        ordering = ['travel_day']

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
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, blank=True, null=True, related_name='images')
    plan = models.ForeignKey(TravelPlan, on_delete=models.PROTECT, blank=True, null=True, related_name='plan_images')
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


@python_2_unicode_compatible
class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    travel = models.ForeignKey(Travel, on_delete=models.PROTECT, null=True, related_name='travels')


class Todo(TimeStampedModel):

    """ Todo Model """

    text = models.CharField(max_length=255)
    checked = models.BooleanField(default=False)
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE)
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE, related_name='travels_todo')
