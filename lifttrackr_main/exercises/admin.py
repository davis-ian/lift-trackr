from django.contrib import admin
from .models import Competition, Exercise, Category, ExerciseInstance, Session, SetInstance, WorkoutTemplate

# Register your models here.

admin.site.register(Exercise)
admin.site.register(Category)
admin.site.register(Session)
admin.site.register(ExerciseInstance)
admin.site.register(SetInstance)
admin.site.register(WorkoutTemplate)
admin.site.register(Competition)