from django.urls import path, include
from . import views

app_name = 'travel'

urlpatterns = [
    path('', views.TravelListView.as_view(), name='list'),
    path('<int:pk>/', views.TravelDetailView.as_view(), name='detail'),
    path('<int:pk>/plan/', views.TravelPlanListView.as_view(), name='plan'),
    path('<int:pk>/plan/<int:plan_pk>/', views.TravelPlanDetailView.as_view(), name='plan'),
    path('api/', views.TravelApi.as_view(), name='api'),
]