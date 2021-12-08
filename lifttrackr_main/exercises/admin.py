from django.contrib import admin
from .models import Exercise, Category, ExerciseInstance, Session

# Register your models here.

admin.site.register(Exercise)
admin.site.register(Category)
admin.site.register(Session)
admin.site.register(ExerciseInstance)