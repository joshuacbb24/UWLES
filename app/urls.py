# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('messages/', views.room, name='room'),
    path('multichat/', views.multichat, name='multichat'),
]
