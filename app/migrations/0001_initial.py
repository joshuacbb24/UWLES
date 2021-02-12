# Generated by Django 2.2.18 on 2021-02-12 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='bg_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('middle_initial', models.CharField(max_length=3)),
                ('phone_number', models.CharField(max_length=10)),
                ('birthday', models.DateTimeField()),
                ('email', models.EmailField(max_length=254)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other'), ('P', 'Prefer Not To Say')], max_length=20)),
            ],
        ),
    ]
