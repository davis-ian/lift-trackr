# Generated by Django 3.2.9 on 2021-12-14 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0034_competition_sessions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='competition',
            name='sessions',
        ),
        migrations.AddField(
            model_name='session',
            name='competition',
            field=models.ManyToManyField(related_name='sessions', to='exercises.Competition'),
        ),
    ]
