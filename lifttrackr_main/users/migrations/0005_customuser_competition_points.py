# Generated by Django 3.2.9 on 2021-12-13 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20211213_1111'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='competition_points',
            field=models.IntegerField(default=0),
        ),
    ]
