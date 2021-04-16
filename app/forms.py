"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm, ValidationError
from .models import *

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
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username'}),required = True)
    email = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Email'}),required = True)
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}),required = True)
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm'}),required = True)
    class Meta:
        model = Account
        fields = ("username", "email", "password1",)

class User_Bg(ModelForm):
    firstname = forms.CharField(label='First Name',)
    lastname = forms.CharField(label='Last Name',)
    middle_initial = forms.CharField(label='Middle Initial', required=False)
    phone_number = forms.CharField(label='Phone Number',)
    birthday = forms.DateField(label ='Birthdate (m/d/y)', input_formats=['%m/%d/%Y'])
    insurance_provider = forms.CharField(label='Insurance Provider',)
    insurance_member_id = forms.CharField(label='Insurance Member ID',)
    class Meta:
        model = BgInfo
        fields = '__all__'
        exclude = ('user',)

class User_EC(ModelForm):
    phone_number = forms.CharField(label='Phone Number',)
    primary_care_physician = forms.CharField(label='Primary Care Physician',)
    physician_phone = forms.CharField(label='Physician Phone',)
    class Meta:
        model = EcInfo
        fields = '__all__'
        exclude = ('background',)

class User_Demo(ModelForm):
    apt_unit = forms.CharField(label='Apt Unit', required=False)
    class Meta:
        model = DemoInfo
        fields = '__all__'
        exclude = ('background',)

class User_Notes(ModelForm):
    notes = forms.CharField(widget=forms.Textarea, label='',)
    class Meta:
        model = ClientNotes
        fields = '__all__'
        exclude = ('background',)

class Client_List(ModelForm):
    clients = forms.ModelMultipleChoiceField(queryset=Account.objects.filter(is_client=True, has_caseworker=False), widget=forms.CheckboxSelectMultiple)
    def __init__(self, request, *args, **kwargs):
        super(Client_List, self).__init__(*args, **kwargs)
        if request.user:
            current_clients = ClientList.objects.get(user=request.user)
            new_query = current_clients.clients.all()
            queryset = Account.objects.exclude(pk__in=new_query)
        self.fields['clients'].queryset = queryset

    class Meta:
        model = ClientList
        fields = '__all__'
        exclude = ('user',)

class Remove_Clients(ModelForm):
    clients = forms.ModelMultipleChoiceField(queryset=Account.objects.none(), widget=forms.CheckboxSelectMultiple)

    def __init__(self, request, *args, **kwargs):
        super(Remove_Clients, self).__init__(*args, **kwargs)
        if request.user:
            setlist = ClientList.objects.get(user=request.user)
            queryset = setlist.clients.all()
        else:
            queryset = ClientList.objects.none()
        self.fields['clients'].queryset = queryset
    class Meta:
        model = ClientList
        fields = '__all__'
        exclude = ('user',)

class Add_Services(ModelForm):
    tag = forms.CharField(label = 'Add Services')

    class Meta:
        model = ServicesProvided
        fields = '__all__'

class Add_SkillsExpertise(ModelForm):
    tag = forms.CharField(label = 'Add Skills and Expertise')

    class Meta:
        model = SkillsExpertise
        fields = '__all__'

class Add_Individual(ModelForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First Name'}), required = True)
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last Name'}), required = True)
    phone_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone Number'}), required = True)
    email = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Email'}), required = True)
    address = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Address'}), required = True)
    city = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'City'}), required = True)
    state = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'State'}), required = True)
    zipcode = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Zip Code'}), required = True)
    description = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Description'}), required = True)
    services_provided = forms.ModelMultipleChoiceField(queryset=ServicesProvided.objects.all(), widget=forms.CheckboxSelectMultiple)
    skills_expertise = forms.ModelMultipleChoiceField(queryset=SkillsExpertise.objects.all(), widget=forms.CheckboxSelectMultiple)
    class Meta:
        model = IndividualListing
        fields = '__all__'

class Add_Organization(ModelForm):
    org_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Organization Name'}), required = True)
    phone_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone Number'}), required = True)
    email = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Email'}), required = True)
    website = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Website'}), required = True)
    address = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Address'}), required = True)
    city = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'City'}), required = True)
    state = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'State'}), required = True)
    zipcode = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Zip Code'}), required = True)
    description = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Description'}), required = True)
    services_provided = forms.ModelMultipleChoiceField(queryset=ServicesProvided.objects.all(), widget=forms.CheckboxSelectMultiple)
    class Meta:
        model = OrganizationListing
        fields = '__all__'

class filter(forms.Form):
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
        )
    location = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=COUNTY_CHOICES)
