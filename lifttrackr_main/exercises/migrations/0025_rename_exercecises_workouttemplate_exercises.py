# Generated by Django 3.2.9 on 2021-12-10 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0024_rename_template_workouttemplate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='workouttemplate',
            old_name='exercecises',
            new_name='exercises',
        ),
    ]