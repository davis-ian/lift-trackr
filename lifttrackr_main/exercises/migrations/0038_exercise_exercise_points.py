# Generated by Django 3.2.9 on 2021-12-14 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0037_auto_20211213_1629'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='exercise_points',
            field=models.IntegerField(default=0),
        ),
    ]
