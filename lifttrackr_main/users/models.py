from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE


# Create your models here.
class CustomUser(AbstractUser):
    streak = models.IntegerField(default=0)
    friends = models.ManyToManyField("CustomUser", blank=True)
    request_out = models. ManyToManyField("CustomUser", related_name="request_in", blank=True)
    competition_points = models.IntegerField(default=0)
    

    def __str__(self):
        return self.username

