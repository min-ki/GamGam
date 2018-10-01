from django.urls import path, include

from . import views

app_name = 'users'

urlpatterns = [
    path('', views.UserList.as_view(), name='list'),
    path('<int:pk>/', views.UserProfile.as_view(), name='profile'),
]
