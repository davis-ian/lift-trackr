# Generated by Django 3.2.9 on 2021-12-13 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0027_competition'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
