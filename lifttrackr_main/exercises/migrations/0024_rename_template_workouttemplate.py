# Generated by Django 3.2.9 on 2021-12-10 17:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exercises', '0023_template'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Template',
            new_name='WorkoutTemplate',
        ),
    ]
