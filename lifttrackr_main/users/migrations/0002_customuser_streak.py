# Generated by Django 3.2.9 on 2021-12-04 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='streak',
            field=models.IntegerField(default=0),
        ),
    ]
