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
