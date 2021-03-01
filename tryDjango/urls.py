"""
Definition of urls for tryDjango.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from app import forms, views




urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name='signup'),
    path('userinfo/', views.user_information, name='userinfo'),
    path('profile/', views.profile, name='profile'),
   
    path('reset_password/', PasswordResetView.as_view(), name="reset_password"),
    path('reset_password_sent/', PasswordResetDoneView.as_view(), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name="password_reset_confirm"), #encodes user ID in base 64, then uses the token to check if the password is valid, part of PasswordResetConfirmView documentation
    path('reset_password_complete/', PasswordResetCompleteView.as_view(), name="password_reset_complete")
]
