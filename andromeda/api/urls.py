from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet


v1_router = DefaultRouter()
v1_router.register(r'products', ProductViewSet, basename='products')

v1_urlpatterns = [
    path('', include(v1_router.urls))
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]
