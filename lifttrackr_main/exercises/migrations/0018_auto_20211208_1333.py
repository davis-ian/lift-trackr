# Generated by Django 3.2.9 on 2021-12-08 21:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0017_setinstance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exerciseinstance',
            name='reps',
        ),
        migrations.RemoveField(
            model_name='exerciseinstance',
            name='set',
        ),
        migrations.RemoveField(
            model_name='exerciseinstance',
            name='weight',
        ),
    ]
