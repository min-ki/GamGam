from django.urls import path, include

from . import views

app_name = 'users'

urlpatterns = [
    path('', views.UserList.as_view(), name='list'),
    path('<int:pk>/', views.UserProfile.as_view(), name='profile'),
    path('<int:pk>/plans/', views.UserPlan.as_view(), name='plan'),
]
