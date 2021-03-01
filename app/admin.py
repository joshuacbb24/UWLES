from django.contrib import admin
from app.models import bg_info, ec_info, demo_info, patient_notes, CustomUser

admin.site.register(bg_info)
admin.site.register(ec_info)
admin.site.register(demo_info)
admin.site.register(patient_notes)
admin.site.register(CustomUser)
