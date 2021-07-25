"""
Definition of models.
"""
import random
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, User


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("User must have a username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    avatar = models.ImageField(null=True, blank=True, upload_to='profile_pics')
    bgColor = models.CharField(max_length=10, null=True, blank=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_client = models.BooleanField(default=True)
    is_caseworker = models.BooleanField(default=False)
    has_caseworker = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password', ]

    objects = MyAccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def populate_bgColor(self):
        random_number = random.randint(0, 16777215)
        hex_number = format(random_number, 'x')
        self.bgColor = '#' + hex_number
        # TODO maybe remove this model?


# TODO maybe remove this model?
class Channels(models.Model):
    """The channel/socket associted with each user"""
    user = models.ForeignKey(Account, on_delete=models.PROTECT, unique=True)
    channel_name = models.CharField(max_length=512)


class ChatGroup(models.Model):
    group_name = models.CharField(max_length=100, null=True, unique=False)
    created_by = models.ForeignKey(Account, on_delete=models.PROTECT)
    members = models.ManyToManyField(Account, related_name="all_group_members")
    created_at = models.DateTimeField(auto_now_add=True)
    edited = models.BooleanField(default=False)
    solitary = models.BooleanField(default=False)

    def __str__(self):
        return self.group_name

    def last_message(self):
        try:
            return Messages.objects.filter(parent_group=self.pk).order_by('date-sent')[0]
        except IndexError:
            return None


class Messages(models.Model):
    """"messages that have actually been delivered"""
    chat_group = models.ForeignKey(
        ChatGroup, on_delete=models.CASCADE, null=True)
    from_user = models.ForeignKey(
        Account, on_delete=models.PROTECT, related_name="messages_sent")
    message = models.CharField(max_length=1024)
    sent_at = models.DateTimeField(auto_now_add=True)
    is_file = models.BooleanField(default=False)
    is_notice = models.BooleanField(default=False)

    def __str__(self):
        return self.message


class OfflineMessage(models.Model):
    """Messages queued for delivery when a user connnects"""
    offline_user = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='offline_from_user')
    chat_group = models.ForeignKey(
        ChatGroup, on_delete=models.CASCADE, null=True)
    message = models.ForeignKey(
        Messages, on_delete=models.CASCADE, related_name='offline_messages')
    acknowledged = models.BooleanField(default=False)

    def __str__(self):
        return "{} {} {}".format(self.offline_user, self.chat_group, self.message)


class BgInfo(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
        ('Prefer not to say', 'Prefer Not To Say'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             default=1, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    middle_initial = models.CharField(max_length=3)
    phone_number = models.CharField(max_length=10)
    birthday = models.DateField()
    email = models.EmailField(max_length=254)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    insurance_provider = models.CharField(max_length=100, default='Provider')
    insurance_member_id = models.CharField(max_length=25, default='0000000')

    class Meta:
        unique_together = (
            ('firstname', 'lastname', 'middle_initial', 'email'))

    def __str__(self):
        return self.firstname + " " + self.lastname


class EcInfo(models.Model):
    background = models.ForeignKey(BgInfo, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    relationship = models.CharField(max_length=20)
    primary_care_physician = models.CharField(max_length=50)
    physician_phone = models.CharField(max_length=10)

    class Meta:
        unique_together = (('background', 'name'))


class DemoInfo(models.Model):
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
        ('Native Hawaiin or Other Pacific Islander',
         'Native Hawaiin or Other Pacific Islander'),
        ('White', 'White'),
        ('Two or More Races', 'Two or More Races'),
        ('No Response', 'No Response'),
    )
    background = models.ForeignKey(BgInfo, on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apt_unit = models.CharField(max_length=10)
    city = models.CharField(max_length=25)
    zipcode = models.CharField(max_length=5)
    county = models.CharField(max_length=10, choices=COUNTY_CHOICES)
    state = models.CharField(max_length=20, choices=STATE_CHOICES)
    ethnicity = models.CharField(max_length=25, choices=ETHNICITY_CHOICES)
    race = models.CharField(max_length=50, choices=RACE_CHOICES)

    class Meta:
        unique_together = (('background', 'zipcode', 'street_address'))


class ClientNotes(models.Model):
    background = models.ForeignKey(BgInfo, on_delete=models.CASCADE)
    notes = models.CharField(max_length=10000)

    class Meta:
        unique_together = (('background', 'notes'))


class ClientList(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    clients = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="clients")

    def __str__(self):
        return self.user.username

    def add_client(self, clients):
        list = ClientList.objects.get(user_id=self.id)
        for client in clients:
            list.clients.add(client)

    def remove_client(self, clients):
        list = ClientList.objects.get(user_id=self.id)
        for client in clients:
            list.clients.remove(client)


class Articles(models.Model):
    article_name = models.CharField(max_length=100)
    article_descript = models.CharField(max_length=200)
    article_content = models.CharField(max_length=5000)

    class Meta:
        unique_together = (('article_name', 'article_descript'))

    def __str__(self):
        return self.article_name


class Services(models.Model):
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
    service_name = models.CharField(max_length=100, unique=True)
    service_descript = models.CharField(max_length=500)
    service_intake_eligibility = models.CharField(max_length=200)
    service_contact_name = models.CharField(max_length=100)
    service_contact_email = models.EmailField(max_length=254)
    service_contact_phone = models.CharField(max_length=10)
    service_contact_address = models.CharField(max_length=100)
    service_city = models.CharField(max_length=25)
    service_zipcode = models.CharField(max_length=5)
    service_county = models.CharField(max_length=10, choices=COUNTY_CHOICES)
    service_eligibility = models.CharField(
        max_length=75, choices=ELIGIBILITY_CHOICES)
    service_url = models.CharField(max_length=5000)

    def __str__(self):
        return self.service_name


class ServicesProvided(models.Model):
    tag = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.tag


class SkillsExpertise(models.Model):
    tag = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.tag


class IndividualListing(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=10)
    email = models.EmailField(max_length=60)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=25)
    state = models.CharField(max_length=20)
    zipcode = models.CharField(max_length=10)
    description = models.CharField(max_length=500)
    services_provided = models.ManyToManyField(
        ServicesProvided, blank=True,  related_name="servicesprovided")
    skills_expertise = models.ManyToManyField(
        SkillsExpertise, blank=True, related_name="skillsexpertise")

    class Meta:
        unique_together = (('first_name', 'last_name', 'email'))

    def __str__(self):
        fullname = self.first_name + self.last_name
        return fullname


class OrganizationListing(models.Model):
    org_name = models.CharField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=10)
    email = models.EmailField(max_length=60)
    website = models.CharField(max_length=100, default='default.org')
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=25)
    state = models.CharField(max_length=20)
    zipcode = models.CharField(max_length=10)
    description = models.CharField(max_length=500)
    services_provided = models.ManyToManyField(
        ServicesProvided, blank=True,  related_name="providedservices")

    def __str__(self):
        return self.org_name


class ResourceDirectory(models.Model):
    dir_name = models.CharField(max_length=50, unique=True)
    dir_descript = models.CharField(max_length=200)
    dir_articles = models.ManyToManyField(
        Articles, blank=True, related_name="articles")
    dir_services = models.ManyToManyField(
        Services, blank=True, related_name="services")

    def __str__(self):
        return self.dir_name


class UploadedFile(models.Model):
    file = models.FileField()
    owner = models.ForeignKey(Account, null=True, on_delete=models.PROTECT)
    uploaded_at = models.DateTimeField(auto_now_add=True)
