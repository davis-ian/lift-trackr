

from users.models import CustomUser
from exercises.models import Exercise, Category, Session, ExerciseInstance
from rest_framework import serializers



class NestedExerciseSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'id',
            'uuid',
            'name',
            'description',
            
        )
        model = Exercise

class NestedExerciseInstanceSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = (
            'exercise',
            'set',
            'reps',
            'weight',
            'session',
        )
        model = ExerciseInstance

class NestedSessionSerializer(serializers.ModelSerializer):
    exercise_instance_detail = NestedExerciseInstanceSerializer(source='instances', many=True)
    class Meta:
        fields = (
            'user',
            'name',
            'date',
            'exercise_instance_detail',
        )
        model = Session

class NestedCategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'category',
            'id',
        )
        model = Category


class UserSerializer(serializers.ModelSerializer):
    session_details = NestedSessionSerializer(source='sessions', many=True)
    class Meta :
        fields = (
            'id',
            'username',
            'date_joined',
            'streak',
            'session_details'
        )
        model = CustomUser

class ExerciseSerializer(serializers.ModelSerializer):
    category_detail = NestedCategorySerializer(source='categories', many=True)
    class Meta: 
        fields = (
            'name',
            'id',
            'uuid',
            'description',
            'category_detail',
        )
        model = Exercise

class CategorySerializer(serializers.ModelSerializer):
    exercise_detail = NestedExerciseSerializer(source='exercises', many=True)
    class Meta: 
        fields = (
            'category',
            'exercise_detail',
            'id',
        )
        model = Category

class SessionSerializer(serializers.ModelSerializer):
    exercise_instance_detail = NestedExerciseInstanceSerializer(source='instances', many=True)
    class Meta:
        fields = (
            'user',
            'name',
            'date',
            'exercise_instance_detail',
            
        )
        model = Session

class ExerciseInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'set',
            'reps',
            'weight',
            'exercise',
            'session',
        )
        model = ExerciseInstance