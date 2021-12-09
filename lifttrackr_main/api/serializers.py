


from users.models import CustomUser
from exercises.models import Exercise, Category, Session, ExerciseInstance, SetInstance
from rest_framework import serializers

class NestedSetInstanceSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'set',
            'reps',
            'weight',
            
        )
        model = SetInstance

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
    exercise_detail = NestedExerciseSerializer(source='exercise')
    set_detail = NestedSetInstanceSerializer(source='setinstance', many=True)
    class Meta:
        fields = (
            'exercise_detail',
            'exercise',
            'id',
            'session',
            'set_detail'
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
            'id',
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
    exercise_instance_detail = NestedExerciseInstanceSerializer(source='instances', many=True, read_only=True)
    class Meta:
        fields = (
            'user',
            'name',
            'date',
            'exercise_instance_detail',
            'id',
            
        )
        model = Session

class ExerciseInstanceSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = (
            
            'exercise',
            'session',
            
        )
        model = ExerciseInstance

class SetInstanceSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'set',
            'reps',
            'weight',
            'exerciseinstance'
        )
        model = SetInstance