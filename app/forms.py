"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm, ValidationError, modelformset_factory
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
    username = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Username'}), required=True)
    email = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Email'}), required=True)
    avatar = forms.ImageField(widget=forms.FileInput, required=False)
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Password'}), required=True)
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Confirm'}), required=True)

    class Meta:
        model = Account
        fields = ("username", "email", "password1", "avatar")

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

class Add_Organization(ModelForm):
    STATE_OPTIONS = (
            ('MD', 'MD'),
        )
    COUNTY_OPTIONS = (
            ('Worcester', 'Worcester'),
            ('Wicomico', 'Wicomico'),
            ('Somerset', 'Somerset'),
            ('Dorchester', 'Dorchester'),
        )

    org_name = forms.CharField(label = 'Full Organization Name', widget=forms.TextInput(attrs={'maxlength': '100'}), required = False)
    website = forms.CharField(label = 'Website URL', widget=forms.TextInput(attrs={'maxlength': '100'}), required = False)
    org_phone = forms.CharField(label = 'Primary Phone', widget=forms.TextInput(attrs={'placeholder': '(XXX)XXX-XXXX', 'maxlength': '13'}), required = False)
    org_email = forms.EmailField(label = 'Primary Email', widget=forms.EmailInput(attrs={'maxlength': '60'}),required = False)
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Add a short description of your organization here', 'maxlength': '500'}), required = False)
    eligibility = forms.ModelMultipleChoiceField(queryset=Eligibility.objects.all(), widget=forms.CheckboxSelectMultiple)

    street = forms.CharField(label = 'Street Address', widget=forms.TextInput(attrs={'maxlength': '100'}), required = False)
    apt_number = forms.CharField(label = 'Apt./Unit Number', widget=forms.TextInput(attrs={'maxlength': '10'}), required = False)
    city = forms.CharField(label = 'City', widget=forms.TextInput(attrs={'maxlength': '25'}), required = False)
    state = forms.CharField(label = 'State', widget=forms.Select(choices=STATE_OPTIONS), required = False)
    zipcode = forms.CharField(label = 'Zipcode', widget=forms.TextInput(attrs={'maxlength': '5'}), required = False)
    county = forms.CharField(label = 'County', widget=forms.Select(choices=COUNTY_OPTIONS), required = False)

    mail_street = forms.CharField(label = 'Street Address', widget=forms.TextInput(attrs={'maxlength': '100'}), required = False)
    mail_apt_number = forms.CharField(label = 'Apt./Unit Number', widget=forms.TextInput(attrs={'maxlength': '10'}), required = False)
    mail_city = forms.CharField(label = 'City', widget=forms.TextInput(attrs={'maxlength': '25'}), required = False)
    mail_state = forms.CharField(label = 'State', widget=forms.Select(choices=STATE_OPTIONS), required = False)
    mail_zipcode = forms.CharField(label = 'Zipcode', widget=forms.TextInput(attrs={'maxlength': '5'}), required = False)
    mail_county = forms.CharField(label = 'County', widget=forms.Select(choices=COUNTY_OPTIONS), required = False)

    contact_name = forms.CharField(label = 'Full Name', widget=forms.TextInput(attrs={'maxlength': '70'}), required = False)
    contact_phone = forms.CharField(label = 'Primary Phone', widget=forms.TextInput(attrs={'placeholder': '(XXX)XXX-XXXX', 'maxlength': '13'}), required = False)
    contact_title = forms.CharField(label = 'Title', widget=forms.TextInput(attrs={'maxlength': '50'}), required = False)
    contact_email = forms.CharField(label = 'Primary Email', widget=forms.EmailInput(attrs={'maxlength': '60'}), required = False)

    org_tags = forms.ModelMultipleChoiceField(queryset=PillTags.objects.all(), widget=forms.CheckboxSelectMultiple, required = False)
    org_image = forms.ImageField(widget=forms.FileInput, required=False)

    collaborators = forms.ModelMultipleChoiceField(queryset=Account.objects.filter(is_caseworker=True), widget=forms.CheckboxSelectMultiple, required = False)

    languages = forms.ModelMultipleChoiceField(queryset=Languages.objects.all(), widget=forms.CheckboxSelectMultiple, required = False)

    areas_served = forms.ModelMultipleChoiceField(queryset=Counties.objects.all(), widget=forms.CheckboxSelectMultiple, required = False)
    
    class Meta:
        model = Organizations
        fields = '__all__'
        exclude = ('lat', 'long',)

class filter(forms.Form):
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
        )
    location = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=COUNTY_CHOICES)

class UploadFileForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ['file']

class GetBackgroundColorForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['bgColor']

class AddOrgToSubDir(forms.Form):
    sub_dirs = forms.ModelMultipleChoiceField(queryset=SubDirectory.objects.all(), widget=forms.CheckboxSelectMultiple(attrs={'class': 'customCBox'}))

AddTagsFormset = modelformset_factory(
    PillTags,
    fields=('__all__'),
    extra=1,
)

AddOrgsFormset = modelformset_factory(
    Organizations,
    form=Add_Organization,
    extra=0
    )

class TestForm(ModelForm):
    testtags = forms.ModelMultipleChoiceField(queryset=PillTags.objects.all(), widget=forms.CheckboxSelectMultiple)
    class Meta:
        model = TestModel
        fields = '__all__'

class TestForm2(forms.ModelForm):
    organization = forms.ModelChoiceField(queryset=Organizations.objects.none(), required = False, empty_label = None)

    def __init__(self, *args, **kwargs):
        user_id = kwargs.pop('user_id', None)
        super(TestForm2, self).__init__(*args, **kwargs)
        if user_id:
            current_orgs = SharedWithMe.objects.get(name=user_id)
            queryset = current_orgs.organization.all()
        self.fields['organization'].queryset = queryset


    class Meta:
        model = SharedWithMe
        fields = '__all__'
        exclude = ('name',)

class DirFileForm(forms.ModelForm):
    file = forms.FileField(widget=forms.FileInput(attrs={'class': 'drop-zone__input__prefix__', 'name': 'myFile'}), required = True)
    document_name = forms.CharField(widget=forms.TextInput(attrs={'maxlength': '50', 'placeholder': 'Add alternative name'}), required = False)
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Add optional description', 'maxlength': '200'}), required = False)
    tags = forms.ModelMultipleChoiceField(queryset=PillTags.objects.all(), required = False)
    this_id = forms.CharField(required = False)
    folder = forms.CharField(required = False)
    file_collaborators = forms.ModelMultipleChoiceField(queryset=Account.objects.filter(is_caseworker=True), required = False)

    class Meta:
        model = DirectoryFiles
        fields = '__all__'

DirFilesFormset = modelformset_factory(
    DirectoryFiles,
    form=DirFileForm,
    extra=0,
    )
