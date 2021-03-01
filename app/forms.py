"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm, ValidationError
from .models import bg_info, ec_info, demo_info, patient_notes, CustomUser

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


class User_Creation_Form(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password1", "password2")

class User_Bg(ModelForm):
    firstname = forms.CharField(label='First Name',)
    lastname = forms.CharField(label='Last Name',)
    middle_initial = forms.CharField(label='Middle Initial', required=False)
    phone_number = forms.CharField(label='Phone Number',)
    birthday = forms.DateField(label ='Birthdate (m/d/y)', input_formats=['%m/%d/%Y'])
    insurance_provider = forms.CharField(label='Insurance Provider',)
    insurance_member_id = forms.CharField(label='Insurance Member ID',)
    class Meta:
        model = bg_info
        fields = '__all__'
        exclude = ('user',)

class User_EC(ModelForm):
    phone_number = forms.CharField(label='Phone Number',)
    primary_care_physician = forms.CharField(label='Primary Care Physician',)
    physician_phone = forms.CharField(label='Physician Phone',)
    class Meta:
        model = ec_info
        fields = '__all__'
        exclude = ('background',)

class User_Demo(ModelForm):
    apt_unit = forms.CharField(label='Apt Unit', required=False)
    class Meta:
        model = demo_info
        fields = '__all__'
        exclude = ('background',)

class User_Patient(ModelForm):
    notes = forms.CharField(widget=forms.Textarea, label='',)
    class Meta:
        model = patient_notes
        fields = '__all__'
        exclude = ('background',)