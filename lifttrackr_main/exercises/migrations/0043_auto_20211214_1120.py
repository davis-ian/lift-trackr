# Generated by Django 3.2.9 on 2021-12-14 19:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0042_auto_20211214_0947'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exerciseinstance',
            name='points',
        ),
        migrations.AddField(
            model_name='setinstance',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='compexercise',
            name='competition',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='compexercises', to='exercises.competition'),
        ),
    ]