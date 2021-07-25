from django.contrib import admin
from app.models import *

class ChannelsAdmin(admin.ModelAdmin):
    list_display = ['user', 'channel_name']

class MessageAdmin(admin.ModelAdmin):
    list_display = ['from_user','chat_group','message']

class RoomAdmin(admin.ModelAdmin):
    list_display = ('created_by', 'created_at', 'name')

admin.site.enable_nav_sidebar = False
admin.site.register(BgInfo)
admin.site.register(EcInfo)
admin.site.register(DemoInfo)
admin.site.register(ClientNotes)
admin.site.register(Account)
admin.site.register(ClientList)
admin.site.register(Articles)
admin.site.register(ResourceDirectory)
admin.site.register(Organizations)
admin.site.register(FileListing)
admin.site.register(Channels, ChannelsAdmin)
admin.site.register(ChatGroup)
admin.site.register(Messages, MessageAdmin)
admin.site.register(UploadedFile)
admin.site.register(OfflineMessage)
admin.site.register(Services)
admin.site.register(SubDirectory)
admin.site.register(PillTags)
admin.site.register(Eligibility)
admin.site.register(TestModel)
admin.site.register(SharedWithMe)
admin.site.register(DirectoryFiles)
admin.site.register(FileFolder)
admin.site.register(RecentFiles)
admin.site.register(FileSubFolder)
admin.site.register(Counties)
admin.site.register(Languages)