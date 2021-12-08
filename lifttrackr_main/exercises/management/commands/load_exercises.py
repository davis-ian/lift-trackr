
from django.core.management.base import BaseCommand
from exercises.models import Exercise, Category
import requests

class Command(BaseCommand):

    def handle(self, *args, **options):

        #Clear existing exercises from database
        Exercise.objects.all().delete()
        Category.objects.all().delete()

        #API request
        response = requests.get('https://wger.de/api/v2/exerciseinfo', params= { 'language': 2, 'limit':500, 'offset': 0} )     
        # response2 = requests.get('https://wger.de/api/v2/exercisecategory/')  
        
        new_exercise = response.json()
        # new_category = response2.json()
        
        for exercise in new_exercise['results']:

            exercise_obj = Exercise.objects.create(
                name=exercise['name'],
                uuid=exercise['uuid'],
                description=exercise['description'],
                # category=exercise['category']['name']
            )

            for category in exercise['category']:
                cat_obj, created = Category.objects.get_or_create(category=exercise['category']['name'])
                cat_obj.exercises.add(exercise_obj)

        