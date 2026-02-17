from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views


v1_router = DefaultRouter()
v1_router.register(r'products', views.ProductViewSet, basename='products')
v1_router.register('auth/send-code/', views.SendCode, basename='send_code')
v1_router.register(
    'auth/verify-code/', views.VerifyCode, basename='verify_code'
)
# v1_router.register()
# v1_router.register('auth/logout/')

v1_urlpatterns = [
    path('', include(v1_router.urls))
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]
