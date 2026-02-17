from django.contrib.auth import views as auth_views
from django.urls import path, reverse_lazy

from . import views


app_name = 'user'

urlpatterns = [
    path('sms/send/', views.SendSmsCodeView.as_view(), name='send_code'),
    path('sms/verify/', views.VerifySmsCodeView.as_view(), name='verify_code'),
    path(
        'logout/',
        auth_views.LogoutView.as_view(
            next_page=reverse_lazy('products:index')),
        name='logout'
    ),
]
