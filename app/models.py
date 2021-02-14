"""
Definition of models.
"""

from django.db import models

class bg_info(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        ('P', 'Prefer Not To Say'),
        )
    firstname = models.CharField(max_length = 50)
    lastname = models.CharField(max_length = 50)
    middle_initial = models.CharField(max_length = 3)
    phone_number = models.CharField(max_length = 10)
    birthday = models.DateTimeField()
    email = models.EmailField(max_length = 254)
    gender = models.CharField(max_length = 20, choices=GENDER_CHOICES)
    insurance_provider = models.CharField(max_length = 100, default='Provider')
    insurance_member_id = models.CharField(max_length = 25, default='0')

    class Meta:
        unique_together = (('firstname', 'lastname', 'middle_initial', 'email'))

class ec_info(models.Model):
    background = models.ForeignKey(bg_info, on_delete=models.CASCADE)
    ec_full_name = models.CharField(max_length = 50)
    ec_primary_phone = models.CharField(max_length = 10)
    relationship_to_client = models.CharField(max_length = 20)
    primary_care_physician = models.CharField(max_length = 50)
    primary_care_physician_phone = models.CharField(max_length = 10)

    class Meta:
        unique_together = (('background', 'ec_full_name'))

class demo_info(models.Model):
    COUNTY_CHOICES = (
        ('WO', 'Worcester'),
        ('WI', 'Wicomico'),
        ('SO', 'Somerset'),
        ('DO', 'Dorchester'),
        )
    ETHNICITY_CHOICES = (
        ('HI', 'Hispanic or Latino'),
        ('NH', 'Not Hispanic or Latino'),
        ('NR', 'No Response'),
        )
    RACE_CHOICES = (
        ('AI', 'American Indian or Alaska Native'),
        ('AS', 'Asian'),
        ('BL', 'Black or African American'),
        ('NH', 'Native Hawaiin or Other Pacific Islander'),
        ('WH', 'White'),
        ('TWO', 'Two or More Races'),
        ('NO', 'No Response'),
        )
    background = models.ForeignKey(bg_info, on_delete=models.CASCADE)
    street_address = models.CharField(max_length = 100)
    apt_unit_number = models.CharField(max_length = 10)
    state = models.CharField(max_length = 20)
    city = models.CharField(max_length = 25)
    zipcode = models.CharField(max_length = 5)
    county = models.CharField(max_length = 10, choices=COUNTY_CHOICES)
    ethnicity = models.CharField(max_length = 25, choices=ETHNICITY_CHOICES)
    race = models.CharField(max_length = 50, choices=RACE_CHOICES)

    class Meta:
        unique_together = (('background', 'zipcode', 'street_address'))