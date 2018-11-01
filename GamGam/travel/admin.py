from django.contrib import admin
from .models import Travel, TravelPlan, Image

# todo: 여행 리스트 세부내역 관리자 페이지 만들기
class ImageInline(admin.StackedInline):
    model = Image

class TravelPlanInline(admin.StackedInline):
    model = TravelPlan
    inlines = [ImageInline, ]

@admin.register(TravelPlan)
class TravelPlanAdmin(admin.ModelAdmin):
    inlines = [ImageInline, ]

@admin.register(Travel)
class TravelAdmin(admin.ModelAdmin):
    inlines = [TravelPlanInline, ]
