"""
Definition of views.
"""
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.shortcuts import render, redirect
from django.http import HttpRequest
from .forms import User_Bg, User_EC, User_Demo, User_Creation_Form, User_Patient
from .models import bg_info, ec_info, demo_info, patient_notes
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
            group = Group.objects.get(name='client')
            user = authenticate(username=username, password=user_password)
            user.groups.add(group);
            login(request, user)
            return redirect('home')
    else:
        form = User_Creation_Form()
    return render(request, 'app/signup.html', {'form': form})
    
@login_required(login_url='login')
def user_information(request):
    form1 = User_Bg()
    form2 = User_EC()
    form3 = User_Demo()
    form4 = User_Patient()
    if request.method == 'POST':
        form1 = User_Bg(request.POST)
        form2 = User_EC(request.POST)
        form3 = User_Demo(request.POST)
        form4 = User_Patient(request.POST)
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
        obj1 = bg_info.objects.get(user_id=current_user)
        obj2 = ec_info.objects.get(background_id=obj1.id)
        obj3 = demo_info.objects.get(background_id=obj1.id)
        obj4 = patient_notes.objects.get(background_id=obj1.id)
    except bg_info.DoesNotExist:
        obj1 = None
        obj2 = None
        obj3 = None
        obj4 = None
    context = {
            'object1': obj1,
            'object2': obj2,
            'object3': obj3,
            'object4': obj4,
    }
    return render(request, 'app/profile.html', context)