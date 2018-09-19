from django.urls import path, include
from . import views

app_name = 'travel'

urlpatterns = [
    path('/<int:pk>/plan/', views.travel_plan_list, name='travel_plan_list'),
]
