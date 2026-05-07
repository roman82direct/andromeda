from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views


v1_router = DefaultRouter()
v1_router.register(r'products', views.ProductViewSet, basename='products')

v1_urlpatterns = [
    path('', include(v1_router.urls)),
    path('auth/csrf/', views.CsrfCookieView.as_view(), name='csrf_cookie'),
    path('auth/send-code/', views.SendCodeView.as_view(), name='send_code'),
    path(
        'auth/verify-code/', views.VerifyCodeView.as_view(), name='verify_code'
    ),
    path(
        'auth/token-refresh/',
        views.CookieTokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]
