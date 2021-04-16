import django_filters
from django_filters import MultipleChoiceFilter

from .models import *
from django import forms 

class serviceFilter(django_filters.FilterSet):
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
        )
    ELIGIBILITY_CHOICES = (
        ('All Ages', 'All Ages'),
        ('Children & Youth (17 and under)', 'Children & Youth (17 and under)'),
        ('Adults (18-60)', 'Adults (18-60)'),
        ('Seniors (60+)', 'Seniors (60+)'),
        )
    service_county =  MultipleChoiceFilter(choices = COUNTY_CHOICES, widget=forms.CheckboxSelectMultiple)
    service_eligibility =  MultipleChoiceFilter(choices = ELIGIBILITY_CHOICES, widget=forms.CheckboxSelectMultiple)
    
    class Meta:
            model = Services
            fields = '__all__'
            exclude = ['service_name', 
                       'service_descript', 
                       'service_intake_eligibility',
                      'service_contact_name',
                      'service_contact_email',
                      'service_contact_phone',
                      'service_contact_address',
                      'service_city',
                      'service_zipcode',
                      'service_url'
                      ]

class directoryFilter(django_filters.FilterSet):
    DIRECTORY_CHOICES = (
        ('Healthcare', 'Healthcare'),
        ('Aging and Disability', 'Aging and Disability'),
        ('Children and Families', 'Children and Families'),
        ('Domestic/Family Violence', 'Domestic/Family Violence'),
        ('Education', 'Education'),
        ('Employment', 'Employment'),
        ('Food Services', 'Food Services'),
        ('Housing and Shelter', 'Housing and Shelter'),
        ('Legal and Tax Services', 'Legal and Tax Services'),
        )

    dir_name = MultipleChoiceFilter(choices = DIRECTORY_CHOICES, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = ResourceDirectory
        fields = '__all__'
        exclude = ('dir_descript', 'dir_articles', 'dir_services',)







