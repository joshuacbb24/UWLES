"""
Definition of models.
"""

from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=1)

class bg_info(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
        ('Prefer not to say', 'Prefer Not To Say'),
        )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    firstname = models.CharField(max_length = 50)
    lastname = models.CharField(max_length = 50)
    middle_initial = models.CharField(max_length = 3)
    phone_number = models.CharField(max_length = 10)
    birthday = models.DateField()
    email = models.EmailField(max_length = 254)
    gender = models.CharField(max_length = 20, choices=GENDER_CHOICES)
    insurance_provider = models.CharField(max_length = 100, default='Provider')
    insurance_member_id = models.CharField(max_length = 25, default='0000000')

    class Meta:
        unique_together = (('firstname', 'lastname', 'middle_initial', 'email'))

class ec_info(models.Model):
    background = models.ForeignKey(bg_info, on_delete=models.CASCADE)
    name = models.CharField(max_length = 50)
    phone_number = models.CharField(max_length = 10)
    relationship = models.CharField(max_length = 20)
    primary_care_physician = models.CharField(max_length = 50)
    physician_phone = models.CharField(max_length = 10)

    class Meta:
        unique_together = (('background', 'name'))

class demo_info(models.Model):
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
        )
    STATE_CHOICES = (
        ('MD', 'Maryland'),
        )
    ETHNICITY_CHOICES = (
        ('Hispanic or Latino', 'Hispanic or Latino'),
        ('Not Hispanic or Latino', 'Not Hispanic or Latino'),
        ('No Response', 'No Response'),
        )
    RACE_CHOICES = (
        ('American Indian or Alask Native', 'American Indian or Alaska Native'),
        ('Asian', 'Asian'),
        ('Black or African American', 'Black or African American'),
        ('Native Hawaiin or Other Pacific Islander', 'Native Hawaiin or Other Pacific Islander'),
        ('White', 'White'),
        ('Two or More Races', 'Two or More Races'),
        ('No Response', 'No Response'),
        )
    background = models.ForeignKey(bg_info, on_delete=models.CASCADE)
    street_address = models.CharField(max_length = 100)
    apt_unit = models.CharField(max_length = 10)
    city = models.CharField(max_length = 25)
    zipcode = models.CharField(max_length = 5)
    county = models.CharField(max_length = 10, choices=COUNTY_CHOICES)
    state = models.CharField(max_length = 20, choices=STATE_CHOICES)
    ethnicity = models.CharField(max_length = 25, choices=ETHNICITY_CHOICES)
    race = models.CharField(max_length = 50, choices=RACE_CHOICES)

    class Meta:
        unique_together = (('background', 'zipcode', 'street_address'))

class patient_notes(models.Model):
    background = models.ForeignKey(bg_info, on_delete=models.CASCADE)
    notes = models.CharField(max_length = 10000)

    class Meta:
        unique_together = (('background', 'notes'))