from .models import *
def site_user(request):
    background = BgInfo.objects.all()
    userlist = []
    for backs in background:
        userlist.append(backs.user_id)
    return {'background': background, 'userlist': userlist,}
