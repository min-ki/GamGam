from django.conf import settings
from django.conf.urls import url
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from .travel import views
from .views import ReactAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    path('travel/', include('GamGam.travel.urls', namespace='travel')),
    path('user/', include('GamGam.users.urls', namespace='user')),
    path('accounts/', include('allauth.urls')),

    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', ReactAppView.as_view()),
]