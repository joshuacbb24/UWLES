"""
Definition of views.
"""
from django.contrib.auth import login, authenticate
from django.contrib.auth import decorators
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required
from datetime import datetime, timedelta
from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpRequest, JsonResponse, HttpResponse
from .forms import *
from .models import *
from .filters import *
from .decorators import unauthenticated_user, allowed_user
from django.views import View
from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.utils import timezone
from django.urls import reverse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

@login_required(login_url='login')
def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html'
       
        #{
            #'title':'Home Page',
            #'year':datetime.now().year,
        #}
       
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        }
    )

def resourcelist(request):
    directories = ResourceDirectory.objects.all()
    services = Services.objects.all()

    myFilter1 = directoryFilter(request.GET, queryset=directories)
    directories = myFilter1.qs
    myFilter2 = serviceFilter(request.GET, queryset=services)    
    services = myFilter2.qs

    context = {
            'directories': directories,
            'services': services,
            'myFilter1': myFilter1,
            'myFilter2': myFilter2,
            }

    return render(request, 'app/ListView.html', context)

def load_directory(request, pk):
    try:
        directory = ResourceDirectory.objects.filter(id=pk)
    except ResourceDirectory.DoesNotExist:
        directory = None
    services = Services.objects.all()
    myFilter1 = directoryFilter(request.GET, queryset=directory)
    directories = myFilter1.qs
    myFilter2 = serviceFilter(request.GET, queryset=services)
    services = myFilter2.qs

    context = {
            'directories': directories,
            'services': services,
            'myFilter1': myFilter1,
            'myFilter2': myFilter2,
            }
           
    return render(request, 'app/directory.html', context)

def signup(request):
    """Renders the signup page."""
    if request.method == 'POST':
        form = User_Creation_Form(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.populate_bgColor()
            user.save()

            username = form.cleaned_data.get('username')
            user_password = form.cleaned_data.get('password1')
            user_email = form.cleaned_data.get('email')
            user_avatar = form.cleaned_data.get('avatar')
            group = Group.objects.get(name="caseworker")
            user = authenticate(username=username, password=user_password)
            user.groups.add(group)
            login(request, user)
            return redirect('dashboard')
    else:
        form = User_Creation_Form()
    return render(request, 'app/signup.html', {'form': form})




def delete_note(request, NoteId):
    note = MyNotes.objects.get(pk=NoteId)
    note.delete()

    return redirect('/?NoteId=0')

def introduction(request):
    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        difficulty1 = request.POST['add_org_difficulty']
        answer1 = request.POST['add_org_answer']
        comments1 = request.POST['add_org_comments']

        difficulty2 = request.POST['edit_org_difficulty']
        answer2 = request.POST['edit_org_answer']
        comments2 = request.POST['edit_org_comments']

        difficulty3 = request.POST['find_org_difficulty']
        answer3 = request.POST['find_org_answer']
        comments3 = request.POST['find_org_comments']

        difficulty4 = request.POST['add_files_difficulty']
        answer4 = request.POST['add_files_answer']
        comments4 = request.POST['add_files_comments']

        myEntry = MySurvey(add_org_difficulty=difficulty1, add_org_answer=answer1, add_org_comments=comments1,
        edit_org_difficulty=difficulty2, edit_org_answer=answer2, edit_org_comments=comments2, 
        find_org_difficulty=difficulty3, find_org_answer=answer3, find_org_comments=comments3,
        add_folder_file_difficulty=difficulty4, add_folder_file_answer=answer4, add_folder_file_comments=comments4)

        myEntry.save()
        data = {
            'msg': 'hello',
        }
        return JsonResponse(data)

    context = {

    }

    return render(request, 'app/introduction.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker', 'client'])
def user_information(request):
    try:
        instance1 = BgInfo.objects.get(user_id=request.user)
        instance2 = EcInfo.objects.get(background=instance1)
        instance3 = DemoInfo.objects.get(background=instance1)
        instance4 = ClientNotes.objects.get(background=instance1)
        form1 = User_Bg(instance=instance1)
        form2 = User_EC(instance=instance2)
        form3 = User_Demo(instance=instance3)
        form4 = User_Notes(instance=instance4)
    except BgInfo.DoesNotExist:
        instance1 = None
        instance2 = None
        instance3 = None
        instance4 = None
        form1 = User_Bg(instance=instance1)
        form2 = User_EC(instance=instance2)
        form3 = User_Demo(instance=instance3)
        form4 = User_Notes(instance=instance4)
    if request.method == "POST":
        form1 = User_Bg(request.POST, instance=instance1)
        form2 = User_EC(request.POST, instance=instance2)
        form3 = User_Demo(request.POST, instance=instance3)
        form4 = User_Notes(request.POST, instance=instance4)
        if form1.is_valid() and form2.is_valid() and form3.is_valid() and form4.is_valid():
            form_one = form1.save(commit=False)
            form_one.user = request.user
            form_one = form1.save()
            form_two = form2.save(commit=False)
            form_two.background = form_one
            form_two.save()
            form_three = form3.save(commit=False)
            form_three.background = form_one
            form_three.save()
            form_four = form4.save(commit=False)
            form_four.background = form_one
            form_four.save()
            return redirect('/')

    context = {'form1': form1,
               'form2': form2,
               'form3': form3,
               'form4': form4,
              }
    return render(request, 'app/userinfo.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker', 'client'])
def profile(request):
    current_user = request.user
    try:
        obj1 = BgInfo.objects.get(user_id=current_user)
        obj2 = EcInfo.objects.get(background_id=obj1.id)
        obj3 = DemoInfo.objects.get(background_id=obj1.id)
        obj4 = ClientNotes.objects.get(background_id=obj1.id)
        date_joined = request.user.date_joined
        date_joined.strftime("%d:%B:%y")
    except BgInfo.DoesNotExist:
        obj1 = None
        obj2 = None
        obj3 = None
        obj4 = None
        date_joined = None
    context = {
            'object1': obj1,
            'object2': obj2,
            'object3': obj3,
            'object4': obj4,
            'date_joined': date_joined,
    }
    return render(request, 'app/profile.html', context)
    context = {}
    if request.method == 'POST':
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage()
        name = fs.save(uploaded_file.name, uploaded_file)
        context['url'] = fs.url(name)
    return render(request, 'app/profile.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def clientlist(request):
    current_user = request.user
    try:
        obj1 = ClientList.objects.get(user_id=current_user)
        obj2 = Account.objects.all()
        obj3 = BgInfo.objects.all()
        list = []
        for objs in obj3:
            list.append(objs.user_id)
    except ClientList.DoesNotExist:
        obj1 = None
        obj2 = None
        obj3 = None
    context = {
            'object1': obj1,
            'object2': obj2,
            'object3': obj3,
            'list': list,
    }
    return render(request, 'app/clientlist.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def add_clients(request):
    form1 = Client_List(request)
    if request.method == 'POST':
        form1 = Client_List(request, request.POST)
        if form1.is_valid():
            try: 
                form_one = ClientList.objects.get(user_id=request.user)
                user = request.user
                client = form1.cleaned_data.get('clients')
                ClientList.add_client(user, client)
                client.update(has_caseworker=True)
            except ClientList.DoesNotExist:
                form_one = form1.save(commit=False)
                form_one.user = request.user
                form_one.save()
                form1.save_m2m()
                qs = form1.cleaned_data.get('clients')
                qs.update(has_caseworker=True)
            return redirect('/')
    context = {'form1': form1,}
    return render(request, 'app/addclients.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def remove_clients(request):
    form1 = Remove_Clients(request)
    if request.method == 'POST':
        form1 = Remove_Clients(request, request.POST)
        if form1.is_valid():
            form_one = ClientList.objects.get(user_id=request.user)
            form_one = form1.save(commit=False)
            user = request.user
            client = form1.cleaned_data.get('clients')
            client.update(has_caseworker=False)
            ClientList.remove_client(user, client)
        return redirect('/')
    context = {'form1': form1,}
    return render(request, 'app/removeclients.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def client_profile(request, client_id):
    current_client = client_id
    try:
        obj0 = Account.objects.get(id=current_client)
        obj1 = BgInfo.objects.get(user_id=current_client)
        obj2 = EcInfo.objects.get(background_id=obj1.id)
        obj3 = DemoInfo.objects.get(background_id=obj1.id)
        obj4 = ClientNotes.objects.get(background_id=obj1.id)
        date_joined = obj0.date_joined
        date_joined.strftime("%d:%B:%y")
    except BgInfo.DoesNotExist:
        obj1 = None
        obj2 = None
        obj3 = None
        obj4 = None
        date_joined = None
    context = {
            'object1': obj1,
            'object2': obj2,
            'object3': obj3,
            'object4': obj4,
            'date_joined': date_joined,
    }
    return render(request, 'app/profile.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def client_information(request, client_id):
    #allows caseworkers to edit client information
    current_client = client_id
    try:
        instance1 = BgInfo.objects.get(user_id=current_client)
        instance2 = EcInfo.objects.get(background=instance1)
        instance3 = DemoInfo.objects.get(background=instance1)
        instance4 = ClientNotes.objects.get(background=instance1)
        form1 = User_Bg(instance=instance1)
        form2 = User_EC(instance=instance2)
        form3 = User_Demo(instance=instance3)
        form4 = User_Notes(instance=instance4)
    except BgInfo.DoesNotExist:
        instance1 = None
        instance2 = None
        instance3 = None
        instance4 = None
        form1 = User_Bg(instance=instance1)
        form2 = User_EC(instance=instance2)
        form3 = User_Demo(instance=instance3)
        form4 = User_Notes(instance=instance4)
    if request.method == 'POST':
        form1 = User_Bg(request.POST, instance=instance1)
        form2 = User_EC(request.POST, instance=instance2)
        form3 = User_Demo(request.POST, instance=instance3)
        form4 = User_Notes(request.POST, instance=instance4)
        if form1.is_valid() and form2.is_valid() and form3.is_valid() and form4.is_valid():
            form_one = form1.save(commit=False)
            form_one.user = Account.objects.get(id=current_client)
            form_one = form1.save()
            form_two = form2.save(commit=False)
            form_two.background = form_one
            form_two.save()
            form_three = form3.save(commit=False)
            form_three.background = form_one
            form_three.save()
            form_four = form4.save(commit=False)
            form_four.background = form_one
            form_four.save()
            return redirect('clientlist')

    context = {'form1': form1,
               'form2': form2,
               'form3': form3,
               'form4': form4,
              }
    return render(request, 'app/userinfo.html', context)

def resource_directory(request):
    healthcare = ResourceDirectory.objects.get(dir_name="Healthcare")
    aging_disability = ResourceDirectory.objects.get(dir_name="Aging and Disability")
    children_families = ResourceDirectory.objects.get(dir_name="Children and Families")
    domestic_family_violence = ResourceDirectory.objects.get(dir_name="Domestic/Family Violence")
    education = ResourceDirectory.objects.get(dir_name="Education")
    employment = ResourceDirectory.objects.get(dir_name="Employment")
    food_services = ResourceDirectory.objects.get(dir_name="Food Services")
    housing_shelter = ResourceDirectory.objects.get(dir_name="Housing and Shelter")
    legal_tax_services = ResourceDirectory.objects.get(dir_name="Legal and Tax Services")

    context = {
            'healthcare': healthcare,
            'aging_disability': aging_disability,
            'children_families': children_families,
            'domestic_family_violence': domestic_family_violence,
            'education': education,
            'employment': employment,
            'food_services': food_services,
            'housing_shelter': housing_shelter,
            'legal_tax_services': legal_tax_services,
        }
    return render(request, 'app/resourcedirectory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def add_organization(request):
    form1 = Add_Organization(request.POST)
    if request.method == 'POST':
        if form1.is_valid():
            form1.save()
            return redirect('/')
    context = {
        'form1': form1,
        }
    return render(request, 'app/add_organizations.html', context)

def createevents(request):
    if request.method == 'POST':
        print("post event")
        #form = Event_Creation_Form(request.POST)
        #print("the form is", form)
        command = request.POST['command']
        #if form.is_valid():
        if command == "create":
            """
            print("valid event")
            eventform = form.save(commit=False)
            eventform.populate_myself(request.user)
            eventform.save()
            """
            title = request.POST.get("title")
            description = request.POST.get("description")
            start_day = request.POST.get("start_day")
            start_time = request.POST.get("start_time")
            end_day = request.POST.get("end_day")
            end_time = request.POST.get("end_time")
            all_day = request.POST.get("all_day")
            if all_day == "true":
                all_day = True
            else:
                all_day = False    
            eventform = MyEvents.objects.create(created_by=request.user,title=title, description=description,start_day=start_day,start_time=start_time,
            end_day=end_day,end_time=end_time,all_day=all_day)
            eventform.save()
            id = eventform.pk
            data = {'title':title,'summary':description,'startDate':start_day,'startTime':start_time,
            'endDate':end_day,'endTime':end_time, 'allDay': all_day, 'eventID':id}
            return JsonResponse(data)
        
        elif command == "edit":
            id = request.POST.get('eventid')
            print("the id is", id)
            event = MyEvents.objects.get(pk=id)
            
            title = request.POST.get("title")
            print("title is", title)
            description = request.POST.get("description")
            start_day = request.POST.get("start_day")
            start_time = request.POST.get("start_time")
            end_day = request.POST.get("end_day")
            end_time = request.POST.get("end_time")
            all_day = request.POST.get("all_day")
            if all_day == "true":
                all_day = True
            else:
                all_day = False 
            event.title = title
            event.description = description
            event.start_day = start_day
            event.start_time = start_time
            event.end_day = end_day
            event.end_time = end_time
            event.all_day = all_day
            event.save()
            data = {'title':event.title,'summary':event.description,'startDate':event.start_day,'startTime':event.start_time,
            'endDate':event.end_day,'endTime':event.end_time, 'allDay': event.all_day}
            return JsonResponse(data)
        elif command == "delete":
            id = request.POST.get('eventid')
            event = MyEvents.objects.get(pk=id)
            event.delete()
            event.save()
            return JsonResponse("success")
    elif request.method == 'GET':
        command = request.GET['command']
        if command == "edit":
            id = request.GET['eventid']
            event = MyEvents.objects.get(pk=id)
            data = {'title':event.title,'summary':event.description,'startDate':event.start_day,'startTime':event.start_time,
                'endDate':event.end_day,'endTime':event.end_time, 'allDay': event.all_day}
            return JsonResponse(data)
        else:
            events = []
            username = request.GET['username']
            user = Account.objects.get(username=username)
            eventlist = MyEvents.objects.filter(created_by = user).order_by("start_day","-all_day","start_time")
            for event in eventlist:
                events.append({'title':event.title,'summary':event.description,'startDate':event.start_day,'startTime':event.start_time,
                'endDate':event.end_day,'endTime':event.end_time, 'allDay': event.all_day, 'eventID':event.id})
            data = {'events': events}
            return JsonResponse(data)
 
def delete_note(request, NoteId):
    note = MyNotes.objects.get(pk=NoteId)
    note.delete()

    return redirect('/?NoteId=0')

@login_required(login_url='login')
def dashboard(request):
    tasks = Tasks.objects.filter(assignees=request.user.id)
    users = Account.objects.exclude(pk=request.user.id)
    rooms = ChatGroup.objects.filter(members=request.user).order_by("group_name")
    events = MyEvents.objects.filter(created_by = request.user.id)
    notes = MyNotes.objects.filter(user=request.user.id)
    notesForm = MyNotesForm()

    today = timezone.now().date()
    week_from_today = today + timedelta(days=(today.isocalendar()[2] + 4))

    upcoming_tasks = Tasks.objects.filter(assignees=request.user.id, due_date__gte=week_from_today)
    weekly_tasks1 = Tasks.objects.filter(assignees=request.user.id, due_date__lte=week_from_today)
    weekly_tasks = weekly_tasks1.filter(due_date__gt=today)
    past_due_tasks = Tasks.objects.filter(assignees=request.user.id, due_date__lte=today)
    
    try:
        user_bg = BgInfo.objects.get(user=request.user.id)
    except BgInfo.DoesNotExist:
        user_bg = None

    create_event_form = Event_Creation_Form()
    form1 = TaskForm(initial={'priority': '2'})
    notes = MyNotes.objects.filter(user=request.user).order_by('-date')

    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        taskid = request.POST['myid']
        taskbool = request.POST['checkedval']
        thistask = Tasks.objects.get(id=taskid)
        if taskbool == "false":
            thistask.completion_mark = False
            thistask.save()
        elif taskbool == "true":
            thistask.completion_mark = True
            thistask.save()
        data = {
            'msg': 'hello',
        }
        return JsonResponse(data)

    if request.method == "POST":
        form1 = TaskForm(request.POST, initial={'priority': '2'})
        create_event_form = Event_Creation_Form(request.POST)
        notesForm = MyNotesForm(request.POST)
        if form1.is_valid():
            print("got here")
            form_one = form1.save(commit=False)
            form_one.assigner = request.user
            assignees = form1.cleaned_data.get('assignees')
            form_one.completion_mark = False
            form_one.save()
            form1.save_m2m()
            return redirect('/')
        else:
            print(form1.errors)

        if notesForm.is_valid():
           notes_form = notesForm.save(commit=False)
           notes_form.user=request.user
           notes_form.date=timezone.now()
           notes_form.save()
           return redirect('/')
        else:
            print(notesForm.errors)

    context = {
        'users': users, 
        'user_bg': user_bg, 
        "rooms": rooms, 
        "form1": form1, 
        'events': events,
        'notes': notes,
        'create_event_form': create_event_form,
        'notesForm' : notesForm,
        "tasks": tasks, 
        "today": today, 
        "week_from_today": week_from_today,
        "past_due_tasks": past_due_tasks,
        'weekly_tasks': weekly_tasks,
        'upcoming_tasks': upcoming_tasks,
    }
    return render(request, 'app/dashboard2.html', context)

@login_required(login_url='login')
def room(request):
    users = Account.objects.exclude(pk=request.user.id)
    return render(request, 'app/room.html', {'users': users})

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def make_client_account(request):
    if request.method == 'POST':
        form = User_Creation_Form(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            user_password = form.cleaned_data.get('password1')
            user_email = form.cleaned_data.get('email')
            user_avatar = form.cleaned_data.get('avatar')
            group = Group.objects.get(name="client")
            user = authenticate(username=username, password=user_password)
            user.groups.add(group)
            return redirect('clientlist')
    else:
        form = User_Creation_Form()
    return render(request, 'app/signup.html', {'form': form})

@login_required
def multichat(request):
    """
    Root page view. This is essentially a single-page app, if you ignore the
    login and admin parts.
    """
    # Get a list of rooms, ordered alphabetically
    users = Account.objects.exclude(pk=request.user.id)
    rooms = ChatGroup.objects.filter(
        members=request.user).order_by("group_name")

    # Render that in the index template
    return render(request, "app/multichat.html", {
        "rooms": rooms, 'users': users,
    })

# find out if the rendering htmls is correct

class BasicUploadView(View):
    def get(self, request):
        UploadedFiles_list = UploadedFile.objects.all()
        return render(request, 'app/file_upload.html', {'UploadedFiles': UploadedFiles_list})

    def post(self, request):
        form = UploadFileForm(self.request.POST, self.request.FILES)
        if form.is_valid():
            # form.save()

            UploadedFile = form.save()
            data = {'is_valid': True, 'name': UploadedFile.file.name,
                    'url': UploadedFile.file.url, 'size': UploadedFile.file.size}
            # return redirect("/")
        else:
            data = {'is_valid': False}
        return JsonResponse(data)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def full_directory(request):
    user = request.user
    try:
        swme = SharedWithMe.objects.get(name=user)
    except SharedWithMe.DoesNotExist:
        swme = SharedWithMe(name=user)
        swme.save()
    myorgs = Organizations.objects.filter(id__in=swme.organization.all())
    myfolders = FileFolder.objects.filter(user=user)
    collab_accounts = Account.objects.filter(is_caseworker = True)

    addiction = SubDirectory.objects.get(name="Addiction & Recovery Services")
    counseling = SubDirectory.objects.get(name="Counseling & Case Management")
    disaster = SubDirectory.objects.get(name="Disaster Relief")
    domestic = SubDirectory.objects.get(name="Domestic Violence & Sexual Assault")
    emergency = SubDirectory.objects.get(name="Emergency Shelter")
    faith = SubDirectory.objects.get(name="Faith-Based Community Help")
    food = SubDirectory.objects.get(name="Food Assistance")
    health = SubDirectory.objects.get(name="Health & Fitness")
    hospitals = SubDirectory.objects.get(name="Hospitals/Emergency Care/Medical Care")
    housing = SubDirectory.objects.get(name="Housing and Housing Repair")
    local = SubDirectory.objects.get(name="Local Farmers Markets")
    mental = SubDirectory.objects.get(name="Mental & Behavioral Health")
    nicotine = SubDirectory.objects.get(name="Nicotine/Tobacco Cessation Resources")
    pharmacies = SubDirectory.objects.get(name="Pharmacies")
    primary_care = SubDirectory.objects.get(name="Primary Care Centers")
    adults = SubDirectory.objects.get(name="Adults & Senior Adults")
    children = SubDirectory.objects.get(name="Children")
    youth = SubDirectory.objects.get(name="Youth")
    disabilities = SubDirectory.objects.get(name="Disabilities")
    walk_in = SubDirectory.objects.get(name="Walk In Clinics")

    tags = PillTags.objects.all()
    tagarray = []
    collabarray = []

    orglist = []
    for org in myorgs:
        orglist.append(org.id)

    tagarray2  = []
    for thisorg in myorgs:
        tagarray2.append(thisorg.org_tags.all())

    tagarray3 = []
    m = 0
    for tag in tagarray2:
        tagarray3.append(tags.difference(tag))
        m += 1

    subdirslist = [[]]
    subdirslist2 = []
    j = 0
    for thisorg in myorgs:
        thisdir = SubDirectory.objects.filter(subdirectory_organization=thisorg)
        for dirx in thisdir:
            subdirslist2.append(dirx.name)
        subdirslist.insert(j, subdirslist2)
        subdirslist2 = []
        j += 1
    data = {}
    formset4 = DirFilesFormset(queryset=DirectoryFiles.objects.none(), prefix='file')

    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        formset4 = DirFilesFormset(request.POST, request.FILES, prefix='file')
        if 'downloadbtn' in request.POST:
            fileid = request.POST['fileid']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            try:
                obj = RecentFiles.objects.get(file=fileobj, user=user)
                obj.save()
            except RecentFiles.DoesNotExist:
                obj = RecentFiles(file=fileobj, user=user)
                obj.save()
            data = {
                'msg': 'hello',
            }
            return JsonResponse(data)

        else:
            for form in formset4:
                if form.is_valid():
                    if (form.cleaned_data.get('file') != None):
                        m = form.save()
                        this_file = DirectoryFiles.objects.get(file = m.file)
                        collaborators = form.cleaned_data.get('file_collaborators')
                        myfolder = form.cleaned_data.get('folder')
                        FileFolder.add_to_folder(this_file, user, myfolder)
                        SharedWithMe.addfile(collaborators, this_file)
                        thisobj = MyFileName(file=this_file, user=user)
                        thisobj.save()
                else:
                    print(form.errors)

            return JsonResponse(data)

    elif request.method == "POST":
        form1 = Add_Organization(request.POST, request.FILES)
        form2 = AddOrgToSubDir(request.POST)
        formset = AddTagsFormset(request.POST, prefix='tags')
        formset2 = AddOrgsFormset(request.POST, request.FILES, queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(request.POST, prefix='tags2')
        if 'submit_formx' in request.POST:
            if formset2.is_valid() and formset3.is_valid() and form2.is_valid():
                for formz in formset3:
                    if formz.cleaned_data.get('tag'):
                        tags = formz.cleaned_data.get('tag')
                        formz.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)
            
            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)
            
            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        print(collaborators)
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        print(collaborators)
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)
                        
                return HttpResponseRedirect(request.path_info)

            else:
                print(formset2.errors)
                print(formset3.errors)
                print(form2.errors)
                print("not working")

        elif 'submit_form1' in request.POST:
            if form1.is_valid() and form2.is_valid() and formset.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.cleaned_data.get('tag'):
                        tags = form.cleaned_data.get('tag')
                        form.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid() == False:
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

        else:
            print("not working")
    
    else:
        form1 = Add_Organization()
        form2 = AddOrgToSubDir()
        formset = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags')
        formset2 = AddOrgsFormset(queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags2')

    context = {
            'addiction': addiction,
            'counseling': counseling,
            'disaster': disaster,
            'domestic': domestic,
            'emergency': emergency,
            'faith': faith,
            'food': food,
            'health': health,
            'hospitals': hospitals,
            'housing': housing,
            'local': local,
            'mental': mental,
            'nicotine': nicotine,
            'pharmacies': pharmacies,
            'primary_care': primary_care,
            'adults': adults,
            'children': children,
            'youth': youth,
            'disabilities': disabilities,
            'walk_in': walk_in,

            'form1': form1,
            'form2': form2,
            'formset': formset,
            'tags': tags,
            'formset2': formset2,
            'formset3': formset3,
            'swme': swme,
            'orglist': orglist,
            'tagarray2': tagarray2,
            'subdirslist': subdirslist,
            'tagarray3': tagarray3,
            'formset4': formset4,
            'myfolders': myfolders,
            'collab_accounts': collab_accounts,
        }
    return render(request, 'app/full_directory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def sub_directory(request, pk, option):
    try:
        directory = SubDirectory.objects.filter(id=pk)
    except SubDirectory.DoesNotExist:
        directory = None
    organizations = Organizations.objects.all()
    myFilter1 = subDirectoryFilter(request.GET, queryset=directory)
    directories = myFilter1.qs
    myFilter2 = organizationFilter(request.GET, queryset=organizations)
    organizations = myFilter2.qs

    context = {
        'directories': directories,
        'organizations': organizations,
        'myFilter1': myFilter1,
        'myFilter2': myFilter2,
        'option': option,
        }

    return render(request, 'app/subdirectory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def org_directory(request):
    organizations = Organizations.objects.all()

    user = request.user
    try:
        swme = SharedWithMe.objects.get(name=user)
    except SharedWithMe.DoesNotExist:
        swme = SharedWithMe(name=user)
        swme.save()
    myorgs = Organizations.objects.filter(id__in=swme.organization.all())
    myfolders = FileFolder.objects.filter(user=user)
    collab_accounts = Account.objects.filter(is_caseworker = True)

    tags = PillTags.objects.all()
    tagarray = []
    collabarray = []

    orglist = []
    for org in myorgs:
        orglist.append(org.id)

    tagarray2  = []
    for thisorg in myorgs:
        tagarray2.append(thisorg.org_tags.all())

    tagarray3 = []
    m = 0
    for tag in tagarray2:
        tagarray3.append(tags.difference(tag))
        m += 1

    subdirslist = [[]]
    subdirslist2 = []
    j = 0
    for thisorg in myorgs:
        thisdir = SubDirectory.objects.filter(subdirectory_organization=thisorg)
        for dirx in thisdir:
            subdirslist2.append(dirx.name)
        subdirslist.insert(j, subdirslist2)
        subdirslist2 = []
        j += 1

    data = {}
    formset4 = DirFilesFormset(queryset=DirectoryFiles.objects.none(), prefix='file')

    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        formset4 = DirFilesFormset(request.POST, request.FILES, prefix='file')
        if 'downloadbtn' in request.POST:
            fileid = request.POST['fileid']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            try:
                obj = RecentFiles.objects.get(file=fileobj, user=user)
                obj.save()
            except RecentFiles.DoesNotExist:
                obj = RecentFiles(file=fileobj, user=user)
                obj.save()
            data = {
                'msg': 'hello',
            }
            return JsonResponse(data)

        else:
            for form in formset4:
                if form.is_valid():
                    if (form.cleaned_data.get('file') != None):
                        m = form.save()
                        this_file = DirectoryFiles.objects.get(file = m.file)
                        collaborators = form.cleaned_data.get('file_collaborators')
                        myfolder = form.cleaned_data.get('folder')
                        FileFolder.add_to_folder(this_file, user, myfolder)
                        SharedWithMe.addfile(collaborators, this_file)
                        thisobj = MyFileName(file=this_file, user=user)
                        thisobj.save()
                else:
                    print(form.errors)

            return JsonResponse(data)

    elif request.method == "POST":
        form1 = Add_Organization(request.POST, request.FILES)
        form2 = AddOrgToSubDir(request.POST)
        formset = AddTagsFormset(request.POST, prefix='tags')
        formset2 = AddOrgsFormset(request.POST, request.FILES, queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(request.POST, prefix='tags2')
        if 'submit_formx' in request.POST:
            if formset2.is_valid() and formset3.is_valid() and form2.is_valid():
                for formz in formset3:
                    if formz.cleaned_data.get('tag'):
                        tags = formz.cleaned_data.get('tag')
                        formz.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)
            
            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)
                        
                return HttpResponseRedirect(request.path_info)

            else:
                print(formset2.errors)
                print(formset3.errors)
                print(form2.errors)
                print("not working")

        elif 'submit_form1' in request.POST:
            if form1.is_valid() and form2.is_valid() and formset.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.cleaned_data.get('tag'):
                        tags = form.cleaned_data.get('tag')
                        form.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid() == False:
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

        else:
            print("not working")
    
    else:
        form1 = Add_Organization()
        form2 = AddOrgToSubDir()
        formset = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags')
        formset2 = AddOrgsFormset(queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags2')

    context = {
        'form1': form1,
        'form2': form2,
        'formset': formset,
        'tags': tags,
        'formset2': formset2,
        'formset3': formset3,
        'swme': swme,
        'orglist': orglist,
        'tagarray2': tagarray2,
        'subdirslist': subdirslist,
        'tagarray3': tagarray3,
        'formset4': formset4,
        'myfolders': myfolders,
        'collab_accounts': collab_accounts,
        'organizations': organizations,
        }

    return render(request, 'app/orgdirectory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def org_sub_directory(request, pk):
    try:
        organization = Organizations.objects.get(id=pk)
    except Organizations.DoesNotExist:
        organization = None
    context = {
        'organization': organization,
        }

    return render(request, 'app/org_view_directory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def document_directory(request):
    user = request.user
    try:
        swme = SharedWithMe.objects.get(name=user)
    except SharedWithMe.DoesNotExist:
        swme = SharedWithMe(name=user)
        swme.save()
    myorgs = Organizations.objects.filter(id__in=swme.organization.all())
    myfolders = FileFolder.objects.filter(user=user)
    collab_accounts = Account.objects.filter(is_caseworker = True)
    files = DirectoryFiles.objects.all()
    myfiles = FileFolder.objects.filter(user=user)

    tags = PillTags.objects.all()
    tagarray = []

    orglist = []
    for org in myorgs:
        orglist.append(org.id)

    tagarray2  = []
    for thisorg in myorgs:
        tagarray2.append(thisorg.org_tags.all())

    tagarray3 = []
    m = 0
    for tag in tagarray2:
        tagarray3.append(tags.difference(tag))
        m += 1

    subdirslist = [[]]
    subdirslist2 = []
    j = 0
    for thisorg in myorgs:
        thisdir = SubDirectory.objects.filter(subdirectory_organization=thisorg)
        for dirx in thisdir:
            subdirslist2.append(dirx.name)
        subdirslist.insert(j, subdirslist2)
        subdirslist2 = []
        j += 1

    data = {}
    formset4 = DirFilesFormset(queryset=DirectoryFiles.objects.none(), prefix='file')

    some_day_last_week = timezone.now().date() - timedelta(days=7)
    monday_of_last_week = some_day_last_week - timedelta(days=(some_day_last_week.isocalendar()[2] - 1))

    recent_files = RecentFiles.objects.filter(time_viewed__gte=monday_of_last_week, user=user)

    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        formset4 = DirFilesFormset(request.POST, request.FILES, prefix='file')
        if 'downloadbtn' in request.POST:
            fileid = request.POST['fileid']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            try:
                obj = RecentFiles.objects.get(file=fileobj, user=user)
                obj.save()
            except RecentFiles.DoesNotExist:
                obj = RecentFiles(file=fileobj, user=user)
                obj.save()
            data = {
                'msg': 'hello',
            }
            return JsonResponse(data)

        else:
            for form in formset4:
                if form.is_valid():
                    if (form.cleaned_data.get('file') != None):
                        m = form.save()
                        this_file = DirectoryFiles.objects.get(file = m.file)
                        collaborators = form.cleaned_data.get('file_collaborators')
                        myfolder = form.cleaned_data.get('folder')
                        FileFolder.add_to_folder(this_file, user, myfolder)
                        SharedWithMe.addfile(collaborators, this_file)
                        thisobj = MyFileName(file=this_file, user=user)
                        thisobj.save()
                else:
                    print(form.errors)

            return JsonResponse(data)

    elif request.method == "POST":
        form1 = Add_Organization(request.POST, request.FILES)
        form2 = AddOrgToSubDir(request.POST)
        formset = AddTagsFormset(request.POST, prefix='tags')
        formset2 = AddOrgsFormset(request.POST, request.FILES, queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(request.POST, prefix='tags2')

        if 'add-folder-name' in request.POST:
            foldername = request.POST['add-folder-name']
            new_folder = FileFolder(name=foldername, user=user)
            new_folder.save()
            return HttpResponseRedirect('document_directory')

        elif 'share-file-id' in request.POST:
            fileid = request.POST['share-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            collaborators = request.POST.getlist('sharecollabCheckboxes')
            for collaborator in collaborators:
                collabaccount = Account.objects.get(id=collaborator)
                SharedWithMe.addindfile(collabaccount, fileobj)
            return HttpResponseRedirect('document_directory')

        elif 'move-file-id' in request.POST:
            fileid = request.POST['move-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            foldername = request.POST['move-folder-value']
            try:
                folder = FileFolder.objects.get(name=foldername, user=user)
            except FileFolder.DoesNotExist:
                folder = FileSubFolder.objects.get(name=foldername, user=user)
            originalfolder = FileFolder.objects.get(file=fileobj)
            originalfolder.file.remove(fileobj)
            folder.file.add(fileobj)

        elif 'copy-file-id' in request.POST:
            fileid = request.POST['copy-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            if 'folder-value' not in request.POST:
                folders = ""
            else:
                folders = request.POST.getlist('folder-value')
            if 'subfolder-value' not in request.POST:
                subfolders = ""
            else:
                subfolders = request.POST.getlist('subfolder-value')
            if 'sub2folder-value' not in request.POST:
                sub2folders = ""
            else:
                sub2folders = request.POST.getlist('sub2folder-value')  
            for fold in folders:
                folder = FileFolder.objects.get(name=fold, user=user)
                folder.file.add(fileobj)
            for subfold in subfolders:
                subfolder = FileSubFolder.objects.get(name=subfold, user=user)
                subfolder.file.add(fileobj)
            for sub2fold in sub2folders:
                sub2folder = FileSubFolder.objects.get(name=sub2fold, user=user)
                sub2folder.file.add(fileobj)
            return HttpResponseRedirect('document_directory')

        elif 'rename-file-name' in request.POST:
            fileid = request.POST['rename-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            newname = request.POST['rename-file-name']
            filenameobj = MyFileName.objects.get(file=fileobj, user=user)
            print(filenameobj.newname)
            filenameobj.newname = newname
            filenameobj.save()
            return HttpResponseRedirect('document_directory')

        elif 'delete-file-id' in request.POST:
            fileid = request.POST['delete-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            fileobj.delete()
            return HttpResponseRedirect('document_directory')

        elif 'rename-folder-name' in request.POST:
            folderid = request.POST['rename-folder-id']
            folderobj = FileFolder.objects.get(id=folderid)
            newname = request.POST['rename-folder-name']
            folderobj.name = newname
            folderobj.save()
            return HttpResponseRedirect('document_directory')

        elif 'delete-folder-id' in request.POST:
            folderid = request.POST['delete-folder-id']
            folderobj = FileFolder.objects.get(id=folderid)
            mychildren = folderobj.subfolder.all()
            mychildren.delete()
            folderobj.delete()
            return HttpResponseRedirect('document_directory')

        elif 'submit_formx' in request.POST:
            if formset2.is_valid() and formset3.is_valid() and form2.is_valid():
                for formz in formset3:
                    if formz.cleaned_data.get('tag'):
                        tags = formz.cleaned_data.get('tag')
                        formz.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        subdirs = form2.cleaned_data.get('sub_dirs')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        SubDirectory.add_org(this_org, subdirs)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)
            
            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid():
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() == False and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        print(collaborators)
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset2.is_valid() and formset3.is_valid() and form2.is_valid() == False:
                for formz in formset3:
                    if formz.is_valid():
                        if formz.cleaned_data.get('tag'):
                            tags = formz.cleaned_data.get('tag')
                            formz.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                for formz in formset2:
                    if (formz.has_changed() == True):
                        org = formz.cleaned_data.get('org_name')
                        if formz.is_valid():
                            formz.save()
                        collaborators = formz.cleaned_data.get('collaborators')
                        print(collaborators)
                        this_org = Organizations.objects.get(org_name=org)
                        SharedWithMe.addorg(collaborators, this_org)
                        SharedWithMe.addindorg(user, this_org)
                        Organizations.addextra(org, tagarray)
                        
                return HttpResponseRedirect(request.path_info)

            else:
                print(formset2.errors)
                print(formset3.errors)
                print(form2.errors)
                print("not working")

        elif 'submit_form1' in request.POST:
            if form1.is_valid() and form2.is_valid() and formset.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.cleaned_data.get('tag'):
                        tags = form.cleaned_data.get('tag')
                        form.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid():
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                subdirs = form2.cleaned_data.get('sub_dirs')
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                SubDirectory.add_org(this_org, subdirs)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

            elif formset.is_valid() == False and form1.is_valid() and form2.is_valid() == False:
                org = form1.cleaned_data.get('org_name')
                for form in formset:
                    if form.is_valid():
                        if form.cleaned_data.get('tag'):
                            tags = form.cleaned_data.get('tag')
                            form.save()
                            pill = PillTags.objects.get(tag=tags)
                            tagarray.append(pill)
                    else:
                        pass

                collaborators = form1.cleaned_data.get('collaborators')
                form1.save()
                this_org = Organizations.objects.get(org_name=org)
                SharedWithMe.addorg(collaborators, this_org)
                SharedWithMe.addindorg(user, this_org)
                Organizations.addextra(org, tagarray)

                return HttpResponseRedirect(request.path_info)

        else:
            print("not working")
    
    else:
        form1 = Add_Organization()
        form2 = AddOrgToSubDir()
        formset = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags')
        formset2 = AddOrgsFormset(queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags2')

    context = {
            'form1': form1,
            'form2': form2,
            'formset': formset,
            'tags': tags,
            'formset2': formset2,
            'formset3': formset3,
            'swme': swme,
            'orglist': orglist,
            'tagarray2': tagarray2,
            'subdirslist': subdirslist,
            'tagarray3': tagarray3,
            'formset4': formset4,
            'myfolders': myfolders,
            'collab_accounts': collab_accounts,
            'files': files,
            'myfiles': myfiles,
            'recent_files': recent_files,
        }
    return render(request, 'app/document_directory.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def document_directory_folder(request, pk, option):
    reverseurl = reverse('document_folder_directory', kwargs={'pk': pk, 'option': option})
    user = request.user
    my_path = None
    if option == 1:
        try:
            folder = FileFolder.objects.get(id=pk)
        except FileFolder.DoesNotExist:
            folder = None
    elif option == 2:
        try:
            folder = FileSubFolder.objects.get(id=pk)
        except FileSubFolder.DoesNotExist:
            folder = None
        my_path = FileSubFolder.findpath(pk, user)

    try:
        swme = SharedWithMe.objects.get(name=user)
    except SharedWithMe.DoesNotExist():
        swme = None
    myorgs = Organizations.objects.filter(id__in=swme.organization.all())
    mysubfolders = folder.subfolder.all()
    print(mysubfolders)
    myfolders = FileFolder.objects.filter(user=user)
    collab_accounts = Account.objects.filter(is_caseworker = True)
    files = DirectoryFiles.objects.all()
    myfiles = FileFolder.objects.filter(user=user)

    tags = PillTags.objects.all()
    tagarray = []

    orglist = []
    for org in myorgs:
        orglist.append(org.id)

    tagarray2  = []
    for thisorg in myorgs:
        tagarray2.append(thisorg.org_tags.all())

    tagarray3 = []
    m = 0
    for tag in tagarray2:
        tagarray3.append(tags.difference(tag))
        m += 1

    subdirslist = [[]]
    subdirslist2 = []
    j = 0
    for thisorg in myorgs:
        thisdir = SubDirectory.objects.filter(subdirectory_organization=thisorg)
        for dirx in thisdir:
            subdirslist2.append(dirx.name)
        subdirslist.insert(j, subdirslist2)
        subdirslist2 = []
        j += 1

    data = {}
    formset4 = DirFilesFormset(queryset=DirectoryFiles.objects.none(), prefix='file')

    
    if request.is_ajax() and request.method == "POST":
        print(request.POST)
        formset4 = DirFilesFormset(request.POST, request.FILES, prefix='file')
        if 'downloadbtn' in request.POST:
            fileid = request.POST['fileid']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            print("Successfully in first one")
            try:
                obj = RecentFiles.objects.get(file=fileobj, user=user)
                obj.save()
            except RecentFiles.DoesNotExist:
                obj = RecentFiles(file=fileobj, user=user)
                obj.save()
            data = {
                'msg': 'hello',
            }
            return JsonResponse(data)
        else:
            print("not working properly wtf")
            for form in formset4:
                if form.is_valid():
                    if (form.cleaned_data.get('file') != None):
                        m = form.save()
                        this_file = DirectoryFiles.objects.get(file = m.file)
                        collaborators = form.cleaned_data.get('file_collaborators')
                        myfolder = form.cleaned_data.get('folder')
                        FileFolder.add_to_folder(this_file, user, myfolder)
                        SharedWithMe.addfile(collaborators, this_file)
                else:
                    print(form.errors)

            return JsonResponse(data)

    elif request.method == "POST":
        print(request.POST)
        form1 = Add_Organization(request.POST, request.FILES)
        form2 = AddOrgToSubDir(request.POST)
        formset = AddTagsFormset(request.POST, prefix='tags')
        formset2 = AddOrgsFormset(request.POST, request.FILES, queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(request.POST, prefix='tags2')

        if 'add-folder-name' in request.POST:
            foldername = request.POST['add-folder-name']
            new_folder = FileSubFolder(name=foldername, user=user)
            new_folder.save()
            print(folder)
            print(new_folder)
            folder.subfolder.add(new_folder)
            return HttpResponseRedirect(reverseurl)

        elif 'share-file-id' in request.POST:
            fileid = request.POST['share-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            collaborators = request.POST.getlist('sharecollabCheckboxes')
            for collaborator in collaborators:
                collabaccount = Account.objects.get(id=collaborator)
                SharedWithMe.addindfile(collabaccount, fileobj)
            return HttpResponseRedirect(reverseurl)

        elif 'move-file-id' in request.POST:
            fileid = request.POST['move-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            foldername = request.POST['move-folder-value']
            if option == 1:
                originalfolder = FileFolder.objects.get(id=pk)
            elif option == 2:
                originalfolder = FileSubFolder.objects.get(id=pk)
            try:
                folder = FileFolder.objects.get(name=foldername, user=user)
            except FileFolder.DoesNotExist:
                folder = FileSubFolder.objects.get(name=foldername, user=user)
            originalfolder.file.remove(fileobj)
            folder.file.add(fileobj)
            return HttpResponseRedirect(reverseurl)

        elif 'copy-file-id' in request.POST:
            fileid = request.POST['copy-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            if 'folder-value' not in request.POST:
                folders = ""
            else:
                folders = request.POST.getlist('folder-value')
            if 'subfolder-value' not in request.POST:
                subfolders = ""
            else:
                subfolders = request.POST.getlist('subfolder-value')
            if 'sub2folder-value' not in request.POST:
                sub2folders = ""
            else:
                sub2folders = request.POST.getlist('sub2folder-value')  
            for fold in folders:
                folder = FileFolder.objects.get(name=fold, user=user)
                folder.file.add(fileobj)
            for subfold in subfolders:
                subfolder = FileSubFolder.objects.get(name=subfold, user=user)
                subfolder.file.add(fileobj)
            for sub2fold in sub2folders:
                sub2folder = FileSubFolder.objects.get(name=sub2fold, user=user)
                sub2folder.file.add(fileobj)
            return HttpResponseRedirect(reverseurl)

        elif 'rename-file-name' in request.POST:
            fileid = request.POST['rename-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            newname = request.POST['rename-file-name']
            filenameobj = MyFileName.objects.get(file=fileobj, user=user)
            print(filenameobj.newname)
            filenameobj.newname = newname
            filenameobj.save()
            return HttpResponseRedirect(reverseurl)

        elif 'delete-file-id' in request.POST:
            fileid = request.POST['delete-file-id']
            fileobj = DirectoryFiles.objects.get(id=fileid)
            allfolder = FileFolder.objects.get(user=user, name="All Files")
            print(allfolder)
            if option == 1:
                filefolder = FileFolder.objects.get(id=pk)
            elif option == 2:
                filefolder = FileSubFolder.objects.get(id=pk)
            filefolder.file.remove(fileobj)
            allfolder.file.remove(fileobj)
            return HttpResponseRedirect(reverseurl)

        elif 'rename-folder-name' in request.POST:
            folderid = request.POST['rename-folder-id']
            folderobj = FileSubFolder.objects.get(id=folderid)
            newname = request.POST['rename-folder-name']
            folderobj.name = newname
            folderobj.save()
            return HttpResponseRedirect(reverseurl)

        elif 'delete-folder-id' in request.POST:
            folderid = request.POST['delete-folder-id']
            folderobj = FileSubFolder.objects.get(id=folderid)
            folderobj.delete()
            return HttpResponseRedirect(reverseurl)

        if form1.is_valid() and form2.is_valid() and formset.is_valid():
            org = form1.cleaned_data.get('org_name')
            for form in formset:
                if form.cleaned_data.get('tag'):
                    tags = form.cleaned_data.get('tag')
                    form.save()
                    pill = PillTags.objects.get(tag=tags)
                    tagarray.append(pill)

            collaborators = form1.cleaned_data.get('collaborators')
            form1.save()
            subdirs = form2.cleaned_data.get('sub_dirs')
            this_org = Organizations.objects.get(org_name=org)
            SharedWithMe.addorg(collaborators, this_org)
            SubDirectory.add_org(this_org, subdirs)
            Organizations.addextra(org, tagarray)
            return redirect('dashboard')

        elif formset.is_valid() == False and form1.is_valid() and form2.is_valid():
            org = form1.cleaned_data.get('org_name')
            for form in formset:
                if form.is_valid():
                    if form.cleaned_data.get('tag'):
                        tags = form.cleaned_data.get('tag')
                        form.save()
                        pill = PillTags.objects.get(tag=tags)
                        tagarray.append(pill)
                else:
                    pass

            return redirect('dashboard')

            collaborators = form1.cleaned_data.get('collaborators')
            form1.save()
            subdirs = form2.cleaned_data.get('sub_dirs')
            this_org = Organizations.objects.get(org_name=org)
            SharedWithMe.addorg(collaborators, this_org)
            SubDirectory.add_org(this_org, subdirs)
            Organizations.addextra(org, tagarray)
            return redirect('dashboard')
        
        elif formset2.is_valid() and formset3.is_valid() and form2.is_valid():
            for formz in formset3:
                if formz.cleaned_data.get('tag'):
                    tags = formz.cleaned_data.get('tag')
                    formz.save()
                    pill = PillTags.objects.get(tag=tags)
                    tagarray.append(pill)
            for formz in formset2:
                if (formz.has_changed() == True):
                    org = formz.cleaned_data.get('org_name')
                    if formz.is_valid():
                        formz.save()
                    collaborators = formz.cleaned_data.get('collaborators')
                    subdirs = form2.cleaned_data.get('sub_dirs')
                    this_org = Organizations.objects.get(org_name=org)
                    SharedWithMe.addorg(collaborators, this_org)
                    SubDirectory.add_org(this_org, subdirs)
                    Organizations.addextra(org, tagarray)
                else:
                    pass

            return redirect('test3')

        elif formset2.is_valid() and form1.is_valid() and form2.is_valid():
            print("fourth one")

        else:
            return redirect('dashboard')
    
    else:
        form1 = Add_Organization()
        form2 = AddOrgToSubDir()
        formset = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags')
        formset2 = AddOrgsFormset(queryset=myorgs, prefix='orgs')
        formset3 = AddTagsFormset(queryset=PillTags.objects.none(), prefix='tags2')

    context = {
        'form1': form1,
        'form2': form2,
        'formset': formset,
        'tags': tags,
        'formset2': formset2,
        'formset3': formset3,
        'swme': swme,
        'orglist': orglist,
        'tagarray2': tagarray2,
        'subdirslist': subdirslist,
        'tagarray3': tagarray3,
        'formset4': formset4,
        'myfolders': myfolders,
        'mysubfolders': mysubfolders,
        'collab_accounts': collab_accounts,
        'files': files,
        'myfiles': myfiles,
        'folder': folder,
        'my_path': my_path,
        }

    return render(request, 'app/document_folder_directory.html', context)





def validate_account(request):
    account_name = request.GET.get('account_name', None)
    test_name = Account.objects.filter(username=account_name).exists()
    if (test_name):
        account_name = True
        name_msg = "A user with this name already exists"
    else:
        account_name = False
        name_msg = ""

    account_email = request.GET.get('email_name', None)
    test_email = Account.objects.filter(email=account_email).exists()
    if (test_email):
        account_email = True
        email_msg = "A user with this email already exists"
    else:
        account_email = False
        email_msg = ""
    
    data = {
        'username_taken': account_name,
        'email_taken': account_email,

        'name_msg': name_msg,
        'email_msg': email_msg,
    }

    return JsonResponse(data)

def validate_org(request):
    org_name = request.GET.get('org_name', None)
    test_name = Organizations.objects.filter(org_name=org_name).exists()
    if(test_name):
        name_msg = "An organization with this name already exists!"
    else:
        name_msg = ""
    '''-------------------------------------------------------------------------------------'''
    org_website = request.GET.get('org_website', None)
    web_str = str(org_website)
    if (web_str.endswith(".com") or web_str.endswith(".org") or web_str.endswith(".edu")):
        org_website = False
        website_msg = ""
    else:
        org_website = True
        website_msg = "Must be a valid website"
    '''-------------------------------------------------------------------------------------'''
    org_phone = request.GET.get('org_phone', None)
    phone_str = str(org_phone)
    if (phone_str.isdigit() and len(phone_str) == 10):
        org_phone = False
        phone_msg = ""
    else:
        org_phone = True
        phone_msg = "Phone Number Invalid (Must be 10 numbers)"
    '''-------------------------------------------------------------------------------------'''
    org_email = request.GET.get('org_email', None)
    email_str = str(org_email)
    try:
        validate_email(email_str)
    except ValidationError:
        org_email = True
        email_msg = "Must be a valid email"
    else:
        org_email = False
        email_msg = ""
    '''-------------------------------------------------------------------------------------'''
    org_zipcode = request.GET.get('org_zipcode', None)
    zipcode_str = str(org_zipcode)
    if (zipcode_str.isdigit() and len(zipcode_str) == 5):
        org_zipcode = False
        zipcode_msg = ""
    else:
        org_zipcode = True
        zipcode_msg = "Zipcode Invalid (Must be 5 numbers)"
    '''-------------------------------------------------------------------------------------'''
    contact_phone = request.GET.get('contact_phone', None)
    cphone_str = str(contact_phone)
    if (cphone_str.isdigit() and len(cphone_str) == 10):
        contact_phone = False
        cphone_msg = ""
    else:
        contact_phone = True
        cphone_msg = "Phone Number Invalid (Must be 10 numbers)"
    '''-------------------------------------------------------------------------------------'''
    contact_email = request.GET.get('contact_email', None)
    cemail_str = str(contact_email)
    try:
        validate_email(cemail_str)
    except ValidationError:
        contact_email = True
        cemail_msg = "Must be a valid email"
    else:
        contact_email = False
        cemail_msg = ""
    '''-------------------------------------------------------------------------------------'''
    mail_zipcode = request.GET.get('mail_zipcode', None)
    mzipcode_str = str(mail_zipcode)
    if (mzipcode_str.isdigit() and len(mzipcode_str) == 5):
        mail_zipcode = False
        mzipcode_msg = ""
    else:
        mail_zipcode = True
        mzipcode_msg = "Zipcode Invalid (Must be 5 numbers)"
    '''-------------------------------------------------------------------------------------'''

    data = {
        'is_taken': test_name,
        'web_invalid': org_website,
        'phone_invalid': org_phone,
        'email_invalid': org_email,
        'zipcode_invalid': org_zipcode,
        'cphone_invalid': contact_phone,
        'cemail_invalid': contact_email,
        'mzipcode_invalid': mail_zipcode,

        'name_msg': name_msg,
        'website_msg': website_msg,
        'phone_msg': phone_msg,
        'email_msg': email_msg,
        'zipcode_msg': zipcode_msg,
        'cphone_msg': cphone_msg,
        'cemail_msg': cemail_msg,
        'mzipcode_msg': mzipcode_msg,
    }
    return JsonResponse(data)
