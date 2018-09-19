from django.conf import settings
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_swagger.views import get_swagger_view
# from rest_framework.authtoken import views
from .travel.views import TravelViewSet

# Swagger
schema_view = get_swagger_view(title='Pastebin API')

router = DefaultRouter()
router.register(r'travel', TravelViewSet)

urlpatterns = [
    path('', schema_view),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/travel', include('GamGam.travel.urls')),
    path('accounts/', include('allauth.urls')),
    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
