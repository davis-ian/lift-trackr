# Generated by Django 3.2.9 on 2021-12-13 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0029_setinstance_comp_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='title',
            field=models.CharField(default='Competition', max_length=200),
            preserve_default=False,
        ),
    ]