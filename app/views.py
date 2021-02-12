"""
Definition of views.
"""
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from datetime import datetime
from django.shortcuts import render, redirect
from django.http import HttpRequest
from .forms import UserInfo

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
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
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            user_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=user_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'app/signup.html', {'form': form})


def user_information(request):
    form = UserInfo()
    if request.method == 'POST':
        form = UserInfo(request.POST)
        if form.is_valid():
            form.save()
    context = {'form': form }
    return render(request, 'app/userinfo.html', context)