"""
Definition of models.
"""

import random
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

mapbox_access_token = 'pk.eyJ1IjoidXdsZXN0ZXN0YWRtaW4iLCJhIjoiY2twdTYzZnU0MHdidjJ2cG0xM2h0dXJsdyJ9.lktGtwWKbT-GAmSUOQNEdA'

class MyAccountManager(BaseUserManager):
    """This is the manager for making a new account. 
    When a new user is added, the manager is activated, and properly sets up the user based on what is
    defined in the manager.
    """
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
    """This is the account model for all accounts in the system. It is finished off by activating the account manager."""
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    avatar = models.ImageField(null=True, blank=True, upload_to='profile_pics')
    bgColor = models.CharField(max_length=10, null=True, blank=True)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    middle_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=False, null=False)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_client = models.BooleanField(default=True)
    is_online = models.BooleanField(default=False)
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
    """Background information for all clients"""
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
    """Emergency contact for all clients. Do note however that this is currently not implemented, it was at one point, but it isn't now. 
    Keeping this around just in case it is needed in the future"""
    background = models.ForeignKey(BgInfo, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    relationship = models.CharField(max_length=20)
    primary_care_physician = models.CharField(max_length=50)
    physician_phone = models.CharField(max_length=10)

    class Meta:
        unique_together = (('background', 'name'))


class DemoInfo(models.Model):
    """Demographic info for all clients."""
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
    """Notes for all clients. This will need to be changed, as there should be many notes per client, instead of just 1."""
    background = models.ForeignKey(BgInfo, on_delete=models.CASCADE)
    notes = models.CharField(max_length=10000)

    class Meta:
        unique_together = (('background', 'notes'))


class ClientList(models.Model):
    """Client list for caseworkers."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    clients = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="clients")

    def __str__(self):
        return self.user.username

    """function to add clients to a client list"""
    def add_client(self, clients):
        list = ClientList.objects.get(user_id=self.id)
        for client in clients:
            list.clients.add(client)

    """function to remove clients to a client list"""
    def remove_client(self, clients):
        list = ClientList.objects.get(user_id=self.id)
        for client in clients:
            list.clients.remove(client)

class Services(models.Model):
    """Old services model, you can probably just delete this."""
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


class PillTags(models.Model):
    """The model for tags. These dont have much use right now besides being applied to organizations upon being added to the database, 
    but in the future they should be used for finding organizaitons"""
    tag = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.tag


class Eligibility(models.Model):
    """Eligibility descriptions for organizations"""
    ELIGIBILITY_CHOICES = (
        ('All Ages', 'All Ages'),
        ('Youth(under 12)', 'Youth(under 12)'),
        ('Teens(13-17)', 'Teens(13-17)'),
        ('Adults(18+)', 'Adults(18+)'),
        ('Seniors(60+)', 'Seniors(60+)'),
    )
    eligibility = models.CharField(max_length=75, choices=ELIGIBILITY_CHOICES)

    def __str__(self):
        return self.eligibility


class Counties(models.Model):
    """County descriptions for organizations"""
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
    )
    county = models.CharField(
        max_length=20, choices=COUNTY_CHOICES, primary_key=True)

    def __str__(self):
        return self.county


class Languages(models.Model):
    """Language descriptions for organizations"""
    LANGUAGE_CHOICES = (
        ('English', 'English'),
        ('Spanish', 'Spanish'),
        ('Haitian Creole', 'Haitian Creole')
    )
    language = models.CharField(
        max_length=20, choices=LANGUAGE_CHOICES, primary_key=True)

    def __str__(self):
        return self.language


class Organizations(models.Model):
    """Organizations model, very important!!!"""
    COUNTY_CHOICES = (
        ('Worcester', 'Worcester'),
        ('Wicomico', 'Wicomico'),
        ('Somerset', 'Somerset'),
        ('Dorchester', 'Dorchester'),
    )
    STATE_CHOICES = (
        ('MD', 'MD'),
    )
    LANGUAGE_CHOICES = (
        ('English', 'English'),
        ('Spanish', 'Spanish'),
    )
    org_name = models.CharField(max_length=100, unique=True)
    website = models.CharField(max_length=100)
    org_phone = models.CharField(max_length=10)
    org_email = models.EmailField(max_length=60)
    org_fax = models.CharField(max_length=10, blank=True)
    description = models.CharField(max_length=500)
    eligibility = models.ManyToManyField(Eligibility)

    street = models.CharField(max_length=100)
    apt_number = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=25)
    state = models.CharField(max_length=20, choices=STATE_CHOICES)
    zipcode = models.CharField(max_length=10)
    county = models.CharField(max_length=10, choices=COUNTY_CHOICES)

    mail_street = models.CharField(max_length=100, blank=True, null=True)
    mail_apt_number = models.CharField(max_length=10, blank=True, null=True)
    mail_city = models.CharField(max_length=25, blank=True, null=True)
    mail_state = models.CharField(
        max_length=20, choices=STATE_CHOICES, blank=True, null=True)
    mail_zipcode = models.CharField(max_length=10, blank=True, null=True)
    mail_county = models.CharField(
        max_length=10, choices=COUNTY_CHOICES, blank=True, null=True)

    contact_name = models.CharField(max_length=70)
    contact_phone = models.CharField(max_length=10)
    contact_title = models.CharField(max_length=50)
    contact_email = models.EmailField(max_length=60)

    org_tags = models.ManyToManyField(PillTags, blank=True)
    org_image = models.ImageField(null=True, blank=True, upload_to='org_pics')

    collaborators = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True)

    languages = models.ManyToManyField(Languages, blank=True)

    areas_served = models.ManyToManyField(Counties, blank=True)

    lat = models.FloatField(blank=True, null=True)
    long = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.org_name

    def save(self, *args, **kwargs):
        address = self.street + "," + self.city + "," + self.state + " " + self.zipcode
        g = geocoder.mapbox(address, key=mapbox_access_token)
        g = g.latlng
        self.lat = g[0]
        self.long = g[1]
        return super(Organizations, self).save(*args, **kwargs)

    """function to add tags to an org"""
    def addextra(testmodel, pills):
        list = Organizations.objects.get(org_name=testmodel)
        for pill in pills:
            list.org_tags.add(pill)


class FileListing(models.Model):
    """File model for document directory"""
    file = models.FileField(unique=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)

class SubDirectory(models.Model):
    """Directory model for the different types of subdirectories"""
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=200)
    subdirectory_organization = models.ManyToManyField(
        Organizations, blank=True, related_name="organizations")

    def __str__(self):
        return self.name

    """"Function to add an organization to a subdirectory"""
    def add_org(org, subdirs):
        test1 = SubDirectory.objects.all()
        test2 = test1.difference(subdirs)
        for subdir in subdirs:
            list = SubDirectory.objects.get(name=subdir)
            list.subdirectory_organization.add(org)
        for subdir in test2:
            list = SubDirectory.objects.get(name=subdir)
            list.subdirectory_organization.remove(org)

class UploadedFile(models.Model):
    file = models.FileField()
    owner = models.ForeignKey(Account, null=True, on_delete=models.PROTECT)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class DirectoryFiles(models.Model):
    """File model for showing files in directory"""
    file = models.FileField(upload_to='file_directory/', blank=False)
    document_name = models.CharField(max_length=50, blank=True)
    description = models.CharField(max_length=200, blank=True)
    tags = models.ManyToManyField(PillTags, blank=True)

    def __str__(self):
        return str(self.id)

class FileSubFolder(models.Model):
    """Folder system for files model"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    file = models.ManyToManyField(DirectoryFiles, blank=True)
    subfolder = models.ManyToManyField('self', blank=True, symmetrical=False)

    class Meta:
        unique_together = (('user', 'name'))

    def __str__(self):
        return str(self.user) + "'s " + str(self.name)

    """Function to add a new folder in a folder"""
    def add_to_folder(file, user, folder):
        my_folder = FileSubFolder.objects.get(name=folder, user=user)
        my_folder.file.add(file)
        my_all_folder = FileFolder.objects.get(name="All Files", user=user)
        my_all_folder.file.add(file)

    """function to get file path"""
    def findpath(folder, user):
        hasParent = True
        original_folder = FileSubFolder.objects.get(id=folder, user=user)
        my_folder = FileSubFolder.objects.get(id=folder, user=user)
        my_path = {}
        while(hasParent):
            try:
                parent_folder = FileSubFolder.objects.get(subfolder=my_folder)
                try:
                    normal_folder = FileFolder.objects.get(
                        subfolder=parent_folder)
                except FileFolder.DoesNotExist:
                    normal_folder = None
                if (normal_folder == None):
                    pass
                else:
                    my_path[normal_folder] = [normal_folder.id, 1]
                my_folder = parent_folder
                my_path[my_folder] = [my_folder.id, 2]
            except FileSubFolder.DoesNotExist:
                try:
                    normal_folder = FileFolder.objects.get(subfolder=my_folder)
                except FileFolder.DoesNotExist:
                    normal_folder = None
                if (normal_folder == None):
                    pass
                else:
                    my_path[normal_folder] = [normal_folder.id, 1]
                hasParent = False
                my_path[original_folder] = [original_folder.id, 2]
        return my_path

    """function to delete subfolders"""
    def delete(self):
        for sub in self.subfolder.all():
            sub.delete()
        super(FileSubFolder, self).delete()

class FileFolder(models.Model):
    """Folder system part 2 for files model"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    file = models.ManyToManyField(DirectoryFiles, blank=True)
    subfolder = models.ManyToManyField(FileSubFolder, blank=True)

    class Meta:
        unique_together = (('user', 'name'))

    def __str__(self):
        return str(self.user) + "'s " + str(self.name)

    """Create these 3 folders upon account creation"""
    @receiver(post_save, sender=get_user_model())
    def create_defaults(sender, instance, created, **kwargs):
        if created:
            FileFolder.objects.create(user=instance, name="All Files")
            FileFolder.objects.create(user=instance, name="Shared With Me")
            FileFolder.objects.create(user=instance, name="Personal")

    """Function for adding a new folder"""
    def add_to_folder(file, user, folder):
        my_folder = FileFolder.objects.get(name=folder, user=user)
        my_folder.file.add(file)
        my_all_folder = FileFolder.objects.get(name="All Files", user=user)
        my_all_folder.file.add(file)

    """Function for deleting a folder"""
    def delete(self):
        for sub in self.subfolder.all():
            sub.delete()
        super(FileFolder, self).delete()

class SharedWithMe(models.Model):
    """Model that handles all the shared resources between individuals"""
    name = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True)
    organization = models.ManyToManyField(Organizations, blank=True)
    file = models.ManyToManyField(DirectoryFiles, blank=True)

    def __str__(self):
        return str(self.name) + " 's organizations"

    """Share organization to multiple individuals"""
    def addorg(collabs, org):
        test1 = Account.objects.filter(is_caseworker=True)
        test2 = test1.difference(collabs)
        for collab in collabs:
            try:
                obj = SharedWithMe.objects.get(name=collab)
            except SharedWithMe.DoesNotExist:
                obj = SharedWithMe(name=collab)
                obj.save()

            obj.organization.add(org)
        for collab in test2:
            try:
                obj = SharedWithMe.objects.get(name=collab)
            except SharedWithMe.DoesNotExist:
                obj = SharedWithMe(name=collab)
                obj.save()
            obj.organization.remove(org)

    """Share organization to a specific individual"""
    def addindorg(collab, org):
        try:
            obj = SharedWithMe.objects.get(name=collab)
        except SharedWithMe.DoesNotExist:
            obj = SharedWithMe(name=collab)
            obj.save()

        obj.organization.add(org)

    """Share file to multiple individuals"""
    def addfile(collabs, file):
        for collab in collabs:
            try:
                obj = SharedWithMe.objects.get(name=collab)
            except SharedWithMe.DoesNotExist:
                obj = SharedWithMe(name=collab)
                obj.save()

            obj.file.add(file)
            FileFolder.add_to_folder(file, collab, "Shared With Me")
            thisobj = MyFileName(file=file, user=collab)
            thisobj.save()

    """Share file to a specific individual"""
    def addindfile(collab, file):
        try:
            obj = SharedWithMe.objects.get(name=collab)
        except SharedWithMe.DoesNotExist:
            obj = SharedWithMe(name=collab)
            obj.save()

        obj.file.add(file)
        FileFolder.add_to_folder(file, collab, "Shared With Me")
        thisobj = MyFileName(file=file, user=collab)
        thisobj.save()

class RecentFiles(models.Model):
    """Update any file when its viewed or downloaded so the system counts it as recently viewed"""
    file = models.ForeignKey(DirectoryFiles, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    time_viewed = models.DateField()

    def save(self, *args, **kwargs):
        '''On save, update view time (time_viewed)'''
        self.time_viewed = timezone.now()
        return super(RecentFiles, self).save(*args, **kwargs)

class MyFileName(models.Model):
    """Unique names for files per person, that way users can change file names of files that were given to them."""
    file = models.ForeignKey(DirectoryFiles, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    newname = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = (('file', 'user',))

    def save(self, *args, **kwargs):
        if not self.pk:
            if (self.file.document_name):
                current_name = self.file.document_name
            else:
                replace_this = str(self.file.file)
                current_name = replace_this.replace('file_directory/', '')
            self.newname = current_name
        super(MyFileName, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.newname) + "-" + str(self.user)

class Priority(models.Model):
    """Model for priority options, available in tasks"""
    priority = models.CharField(max_length=400, unique=True, null=False, blank=False)

    def __str__(self):
        return self.priority

class Tasks(models.Model):
    """Tasks model. Assigner is the person giving the task, assignees are the people receiving the tasks."""
    assigner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="assigner")
    assignees = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="assignee")
    task_title = models.CharField(max_length=50, blank=False, null=False)
    task_description = models.CharField(max_length=500)
    priority = models.ForeignKey(Priority, blank=False, null=False, on_delete=models.CASCADE)
    due_date = models.DateTimeField()
    completion_mark = models.BooleanField()

    class Meta:
        unique_together = (('assigner', 'task_title', 'task_description'))

    def __str__(self):
        return self.task_title

class MyNotes(models.Model):
    """Not to be confused with client notes. These are the notes that appear on the dashboard."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, null=False, blank=False)
    date = models.DateTimeField()

    class Meta:
        ordering = ('date',)
    
class MyEvents(models.Model):
    """
    REPEATING_CHOICES = (
        (7, 'Weekly'),
        ('Monthly', 'Monthly'),
        (365, 'Yearly'),
        (1, 'Daily'),
        (14, 'Bi-Weekly')
        (0, 'Do Not Repeat')
    )
    """
    created_by = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='user_who_created_event')    
    title = models.CharField(max_length=70)
    description = models.TextField(max_length=200)
    start_day = models.DateField()
    start_time = models.TimeField()
    end_day = models.DateField()
    end_time = models.TimeField()
    all_day = models.BooleanField()
    #repeating_event = models.CharField(max_length=20, choices=REPEATING_CHOICES)


    def __str__(self):
        return "{} {}".format(self.created_by, self.title)

    def populate_myself(self, user):
        self.created_by = user
    
class ServiceReferrals(models.Model):
      #Get information of user (the user that is reffering)
    
    referrer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE ,related_name="referrer")
    referFor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="referFor")
    org = models.ForeignKey(Organizations, on_delete=models.CASCADE)
    service = models.CharField(max_length=50 ,null=False, blank=False)
    #org = what organziation that can helpn with service