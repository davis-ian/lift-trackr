# Generated by Django 3.2.9 on 2021-12-13 23:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0032_setinstance_comp_points_per_set'),
    ]

    operations = [
        migrations.RenameField(
            model_name='setinstance',
            old_name='comp_points_per_set',
            new_name='set_points',
        ),
    ]
