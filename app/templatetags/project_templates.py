from app.models import MyFileName
import os
from django import template
from django.contrib.auth.models import Group

register = template.Library()

"""check to see if a user has a specific group"""
@register.filter(name='has_group')
def has_group(user, group_name):
    group = Group.objects.get(name=group_name)
    print(group)
    return True if group in user.groups.all() else False

"""change phone number display"""
@register.filter(name='phone_number')
def phone_number(number):
    first = number[0:3]
    second = number[3:6]
    third = number[6:10]
    return first + '-' + second + '-' + third

"""change phone number display, second option"""
@register.filter(name='phone_number2')
def phone_number2(number):
    first = number[0:3]
    second = number[3:6]
    third = number[6:10]
    print(number)
    return '(' + first + ')' + second + '-' + third

"""get value of index"""
@register.filter(name='index')
def index(indextable, i):
    return indextable[i]

"""get document title, used to get rid of the extra path info"""
@register.filter(name='doctitle')
def doctitle(docname):
    thisdoc = docname
    str2 = str(thisdoc)
    return str2.replace('file_directory/', '')

"""get document type"""
@register.filter(name='docext')
def docext(docname):
    thisdoc = docname
    str2 = str(thisdoc)
    str3 = str2.lower()
    ext = str3.split('.')
    return ext[1]

"""get url"""
@register.filter(name='urlcheck')
def urlcheck(urlname):
    thisurl = urlname
    urlstr = str(thisurl)
    if (urlstr.find("http://") > -1):
        return urlstr
    elif (urlstr.find("https://") > -1):
        return urlstr
    else:
        urlstr = 'http://' + urlstr
        return urlstr

"""get filename, gets rid of the rest of the path"""
@register.filter(name='filename')
def filename(file):
    return os.path.basename(file.file.name)

"""get filename of a file for a specific user (can be different across users)"""
@register.filter(name='myfilename')
def myfilename(file, user):
    my_obj = MyFileName.objects.get(file=file, user=user)
    return my_obj.newname

"""same as above but gets rid of the extension"""
@register.filter(name='myfilename2')
def myfilename2(file, user):
    my_obj = MyFileName.objects.get(file=file, user=user)
    filename = str(my_obj.newname)
    head, sep, tail = filename.partition('.')
    return head

"""get value of dictionary based on key"""
@register.filter(name='getvalue')
def getvalue(dictionary, key):
    return dictionary.get(key)


