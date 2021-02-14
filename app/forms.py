"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm
from .models import bg_info, ec_info, demo_info

class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'User name'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder':'Password'}))

class User_Bg(ModelForm):
    class Meta:
        model = bg_info
        fields = '__all__'

class User_EC(ModelForm):
    class Meta:
        model = ec_info
        fields = '__all__'
        exclude = ('background',)

class User_Demo(ModelForm):
    class Meta:
        model = demo_info
        fields = '__all__'
        exclude = ('background',)