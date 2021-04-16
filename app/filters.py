import django_filters
from django_filters import MultipleChoiceFilter

from .models import *
from django import forms 

class countyFilter(django_filters.FilterSet):
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
        )
    service_county =  MultipleChoiceFilter(choices = COUNTY_CHOICES, widget=forms.CheckboxSelectMultiple)
    
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
                      'service_eligibility',
                      'service_url'
                      ]


class eligibilityFilter(django_filters.FilterSet):
    ELIGIBILITY_CHOICES = (
        ('All Ages', 'All Ages'),
        ('Children & Youth (17 and under)', 'Children & Youth (17 and under)'),
        ('Adults (18-60)', 'Adults (18-60)'),
        ('Seniors (60+)', 'Seniors (60+)'),
        )
   
    
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
                      'service_county',
                      'service_url'
                      ]
 






