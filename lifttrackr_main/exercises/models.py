from django.db import models
from django.db.models.deletion import CASCADE
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

    

    
class Session(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ManyToManyField(CustomUser, related_name="sessions")
    

    def __str__(self):
        return self.name

        

class ExerciseInstance(models.Model):
    session = models.ForeignKey(Session, related_name='instances', on_delete=CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=CASCADE)
    

    def __str__(self):
        return f'{self.exercise} | {self.session}'


class SetInstance(models.Model):
    set = models.IntegerField()
    reps = models.IntegerField()
    weight = models.IntegerField()
    exerciseinstance = models.ManyToManyField(ExerciseInstance, related_name='setinstance')

    def __str__(self):
        return f'{self.set} | {self.exerciseinstance}'