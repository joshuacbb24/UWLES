import django_filters
from django_filters import MultipleChoiceFilter

from .models import *
from django import forms 

class subDirectoryFilter(django_filters.FilterSet):
    SUBDIRECTORY_CHOICES = (
        ('Aging and Disability', 'Aging and Disability'),
        ('Children and Families', 'Children and Families'),
        ('Domestic/Family Violence', 'Domestic/Family Violence'),
        ('Education', 'Education'),
        ('Employment', 'Employment'),
        ('Food Services', 'Food Services'),
        ('Healthcare', 'Healthcare'),
        ('Housing and Shelter', 'Housing and Shelter'),
        ('Legal and Tax Services', 'Legal and Tax Services'),
        ('Utility Assistance', 'Utility Assistance'),
        ('Mental Health', 'Mental Health'),
        ('Veterans', 'Veterans'),
        )

    name = MultipleChoiceFilter(choices = SUBDIRECTORY_CHOICES, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = SubDirectory
        fields = '__all__'
        exclude = ('description', 'subdirectory_organization',)

class organizationFilter(django_filters.FilterSet):
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
    county =  MultipleChoiceFilter(choices = COUNTY_CHOICES, widget=forms.CheckboxSelectMultiple)
    eligibility =  MultipleChoiceFilter(choices = ELIGIBILITY_CHOICES, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Services
        fields = '__all__'
        exclude = ['org_name', 
                   'phone_number', 
                   'email',
                   'website',
                   'address',
                   'city',
                   'state',
                   'zipcode',
                   'description',
                   'services_provided',
                  ]
