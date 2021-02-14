# Generated by Django 2.2.18 on 2021-02-14 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20210214_1528'),
    ]

    operations = [
        migrations.CreateModel(
            name='demo_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street_address', models.CharField(max_length=100)),
                ('apt_unit_number', models.CharField(max_length=10)),
                ('state', models.CharField(max_length=20)),
                ('city', models.CharField(max_length=25)),
                ('zipcode', models.CharField(max_length=5)),
                ('county', models.CharField(choices=[('WO', 'Worcester'), ('WI', 'Wicomico'), ('SO', 'Somerset'), ('DO', 'Dorchester')], max_length=10)),
                ('ethnicity', models.CharField(choices=[('HI', 'Hispanic or Latino'), ('NH', 'Not Hispanic or Latino'), ('NR', 'No Response')], max_length=25)),
                ('race', models.CharField(choices=[('AI', 'American Indian or Alaska Native'), ('AS', 'Asian'), ('BL', 'Black or African American'), ('NH', 'Native Hawaiin or Other Pacific Islander'), ('WH', 'White'), ('TWO', 'Two or More Races'), ('NO', 'No Response')], max_length=50)),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bg_info')),
            ],
            options={
                'unique_together': {('background', 'zipcode', 'street_address')},
            },
        ),
        migrations.CreateModel(
            name='ec_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ec_full_name', models.CharField(max_length=50)),
                ('ec_primary_phone', models.CharField(max_length=10)),
                ('relationship_to_client', models.CharField(max_length=20)),
                ('primary_care_physician', models.CharField(max_length=50)),
                ('primary_care_physician_phone', models.CharField(max_length=10)),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bg_info')),
            ],
            options={
                'unique_together': {('background', 'ec_full_name')},
            },
        ),
        migrations.RemoveField(
            model_name='ec_contact',
            name='background',
        ),
        migrations.DeleteModel(
            name='demographics',
        ),
        migrations.DeleteModel(
            name='ec_contact',
        ),
    ]
