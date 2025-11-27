from django.urls import path

from . import views

app_name = 'products'

urlpatterns = [
    path('', views.CollectionsList.as_view(), name='index'),
]
