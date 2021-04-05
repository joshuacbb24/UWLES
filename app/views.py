"""
Definition of views.
"""
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.shortcuts import render, redirect
from django.http import HttpRequest
from .forms import *
from .models import *
from .decorators import unauthenticated_user, allowed_user

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

def signup(request):
    """Renders the signup page."""
    if request.method == 'POST':
        form = User_Creation_Form(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            user_password = form.cleaned_data.get('password1')
            user_email = form.cleaned_data.get('email')
            group = Group.objects.get(name="client")
            user = authenticate(username=username, password=user_password)
            user.groups.add(group)
            login(request, user)
            return redirect('home')
    else:
        form = User_Creation_Form()
    return render(request, 'app/signup.html', {'form': form})
    
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
    else:
        print("not working properly")
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

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def clientlist(request):
    current_user = request.user
    try:
        obj1 = ClientList.objects.get(user_id=current_user)
        obj2 = Account.objects.all()
        obj3 = BgInfo.objects.all()
    except ClientList.DoesNotExist:
        obj1 = None
        obj2 = None
        obj3 = None
    context = {
            'object1': obj1,
            'object2': obj2,
            'object3': obj3,
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

    form1 = User_Bg()
    form2 = User_EC()
    form3 = User_Demo()
    form4 = User_Notes()
    if request.method == 'POST':
        try: 
            instance1 = BgInfo.objects.get(user_id=current_client)
            instance2 = EcInfo.objects.get(background_id=instance1)
            instance3 = DemoInfo.objects.get(background_id=instance1)
            instance4 = ClientNotes.objects.get(background_id=instance1)
            form1 = User_Bg(request.POST, instance=instance1)
            form2 = User_EC(request.POST, instance=instance2)
            form3 = User_Demo(request.POST, instance=instance3)
            form4 = User_Notes(request.POST, instance=instance4)
        except BgInfo.DoesNotExist:
            form1 = User_Bg(request.POST)
            form2 = User_EC(request.POST)
            form3 = User_Demo(request.POST)
            form4 = User_Notes(request.POST)
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
            return redirect('/')

    context = {'form1': form1,
               'form2': form2,
               'form3': form3,
               'form4': form4,
              }
    return render(request, 'app/userinfo.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
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
def add_individual(request):
    form1 = Add_Individual(request.POST)
    if request.method == 'POST':
        if form1.is_valid():
            form1.save()
            return redirect('/')
    context = {
        'form1': form1,
        }
    return render(request, 'app/add_individuals.html', context)

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


@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def add_services(request):
    form1 = Add_Services()
    if request.method == 'POST':
        form1 = Add_Services(request.POST)
        if form1.is_valid():
            form1.save()
            return redirect('/')
    context = {
        'form1': form1,
        }
    return render(request, 'app/add_services.html', context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['caseworker'])
def add_skills(request):
    form1 = Add_SkillsExpertise()
    if request.method == 'POST':
        form1 = Add_SkillsExpertise(request.POST)
        if form1.is_valid():
            form1.save()
            return redirect('/')
    context = {
        'form1': form1,
        }
    return render(request, 'app/add_skills.html', context)
