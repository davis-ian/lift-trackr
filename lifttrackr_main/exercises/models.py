from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey, ManyToManyField
from users.models import CustomUser


# Create your models here.
class Exercise(models.Model):
    name = models.CharField(max_length=200)
    uuid = models.CharField(max_length=250)
    description = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Category(models.Model):
    category = models.CharField(max_length=50)
    exercises = models.ManyToManyField(Exercise, related_name='categories')

    def __str__(self):
        return self.category

class WorkoutTemplate(models.Model):
    user = ManyToManyField(CustomUser, related_name="templates")
    name = models.CharField(max_length=200)
    exercises = models.ManyToManyField(Exercise, related_name="temp_exercises")

    def __str__(self):
        return f'{self.name} | {self.user}'

class Competition(models.Model):
    title = models.CharField(max_length=200)
    creator = models.ForeignKey(CustomUser, on_delete=CASCADE)
    notes = models.TextField(blank=True, null=True)
    exercises = models.ManyToManyField(Exercise, related_name ="competition_exercises")
    participants = models.ManyToManyField(CustomUser, related_name = "in_competition")
    start_date = models.DateTimeField()
    stop_date = models.DateTimeField()    

    def __str__(self):
        return self.title

class Session(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ManyToManyField(CustomUser, related_name="sessions")
    competition = models.ManyToManyField(Competition, related_name="sessions", blank=True)
    

    def __str__(self):
        return str(self.date)

class ExerciseInstance(models.Model):
    session = models.ForeignKey(Session, related_name='instances', on_delete=CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=CASCADE)
    points = models.IntegerField(default=0)
    

    def __str__(self):
        return f'{self.exercise} | {self.session}'

class SetInstance(models.Model):
    set = models.IntegerField()
    reps = models.IntegerField()
    weight = models.IntegerField() 
    exerciseinstance = models.ManyToManyField(ExerciseInstance, related_name='setinstance')

    def __str__(self):
        return f'{self.set} | {self.exerciseinstance}'