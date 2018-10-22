from django.urls import path, include

from . import views

app_name = 'users'

urlpatterns = [
    # 사용자 리스트 
    path('', views.UserList.as_view(), name='list'),
    # 사용자 프로필 , Timeline 
    path('<int:pk>/', views.UserProfile.as_view(), name='profile'),
    # 사용자 여행계획
    path('<int:pk>/plans/', views.UserPlan.as_view(), name='plan'),
    
]
