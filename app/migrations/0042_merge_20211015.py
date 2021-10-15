from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0041_account_is_online'),
    ]

    operations = [
        migrations.RenameField(
            model_name='priority',
            old_name='difficulty',
            new_name='priority',
        ),
        migrations.RenameField(
            model_name='tasks',
            old_name='difficulty',
            new_name='priority',
        ),
        migrations.CreateModel(
            name='MyEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=70)),
                ('description', models.TextField(max_length=200)),
                ('start_day', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_day', models.DateField()),
                ('end_time', models.TimeField()),
                ('all_day', models.BooleanField()),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_who_created_event', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RenameField(
            model_name='tasks',
            old_name='description',
            new_name='task_description',
        ),
        migrations.RenameField(
            model_name='tasks',
            old_name='title',
            new_name='task_title',
        ),
        migrations.AlterUniqueTogether(
            name='tasks',
            unique_together={('assigner', 'task_title', 'task_description')},
        ),
        migrations.AlterModelOptions(
            name='mynotes',
            options={'ordering': ('date',)},
        ),

        
    ]
