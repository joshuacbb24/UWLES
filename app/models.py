"""
Definition of models.
"""

from django.db import models
class backGroundInfo(models.Model):
# Create your models here.
firstName = models.CharField(label ='First Name',max_length = 50)
lastName = models.CharField(label = 'Last Name', max_length = 50)
middleIntial= models.CharField(label = "Middle Intial", max_length = 3)
phoneNumber = models.CharField(label='0000000000', max_length =10, min_length = 10)
birthday = models.DateTimeField()
email = models.EmailField(max_length=254)
GENDER_CHOICES = [('M','Male'), ('F','Female'), ('Other','Other'), ('Prefer not to say','Prefer not to say')]
gender = models.CharField(choices=GENDER_CHOICES)

