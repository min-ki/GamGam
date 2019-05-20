from django.urls import path, include
from . import views

app_name = 'travel'

urlpatterns = [
  
    # Travel
    path('', views.TravelListView.as_view(), name='list'),
    path('<int:pk>/', views.TravelDetailView.as_view(), name='detail'),
    path('<int:travel_id>/likes/', views.LikeTravel.as_view(), name='like_travel'),
    path('<int:travel_id>/unlikes/', views.UnLikeTravel.as_view(), name='like_travel'),
    path('<int:travel_id>/todo/', views.TodoListView.as_view(), name='todo'),
    path('<int:travel_id>/todo/<int:todo_id>/', views.TodoDetailView.as_view(), name='todo_detail'),
    path('<int:travel_id>/upload/', views.MainImageView.as_view(), name='main_image'),

    # Travel Plan
    path('<int:pk>/plan/', views.TravelPlanListView.as_view(), name='plan'),
    path('<int:pk>/plan/<int:plan_pk>/', views.TravelPlanDetailView.as_view(), name='plan'),
    path('api/<int:travel_id>/', views.TravelApi.as_view(), name='api'),
]
