from django.contrib import admin
from .models import Travel, TravelPlan, Image

# todo: 여행 리스트 세부내역 관리자 페이지 만들기
@admin.register(Travel)
class TravelAdmin(admin.ModelAdmin):
    pass

@admin.register(TravelPlan)
class TravelPlanAdmin(admin.ModelAdmin):
    pass

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass