# Generated by Django 3.1.7 on 2021-10-25 00:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0041_account_is_online'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mynotes',
            options={'ordering': ('date',)},
        ),
    ]
