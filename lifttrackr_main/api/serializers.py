



from users.models import CustomUser
from exercises.models import Exercise, Category, Session, ExerciseInstance, SetInstance, WorkoutTemplate, Competition
from rest_framework import serializers

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'id'
        )
        model = CustomUser

class NestedRequestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'id',
        )
        model = CustomUser

class NestedExerciseSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'id',
            'uuid',
            'name',
            'description',
            
        )
        model = Exercise

class NestedWorkoutTemplateSerializer(serializers.ModelSerializer):
    temp_details = NestedExerciseSerializer(source='exercises', many=True)
    class Meta:
        fields = (
            'user',
            'name',
            # 'exercises',
            'temp_details',
            'id',
        )
        model = WorkoutTemplate

class NestedSetInstanceSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'set',
            'reps',
            'weight',
            'id',
        )
        model = SetInstance


class NestedExerciseInstanceSerializer(serializers.ModelSerializer):
    exercise_detail = NestedExerciseSerializer(source='exercise')
    set_detail = NestedSetInstanceSerializer(source='setinstance', many=True)
    class Meta:
        fields = (
            'exercise_detail',
            'exercise',
            'id',
            'session',
            'set_detail',
            'points'
        )
        model = ExerciseInstance

class NestedSessionSerializer(serializers.ModelSerializer):
    exercise_instance_detail = NestedExerciseInstanceSerializer(source='instances', many=True)
    class Meta:
        fields = (
            'user',
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
    workout_templates = NestedWorkoutTemplateSerializer(source='templates', many=True)
    request_in_details = NestedRequestSerializer(source='request_in', many=True)
    request_out_details = NestedRequestSerializer(source='request_out', many=True)
    friends_list = NestedRequestSerializer(source='friends', many=True)
    class Meta :
        fields = (
            'id',
            'username',
            'date_joined',
            'request_out_details',
            'request_in_details',
            'friends_list',
            'streak',
            'workout_templates',
            'session_details',
            
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
            'points',
            
        )
        model = ExerciseInstance

class SetInstanceSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'set',
            'reps',
            'weight',
            'exerciseinstance',
        )
        model = SetInstance

class WorkoutTemplateSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'user',
            'name',
            'exercises',
            'id',
        )
        model = WorkoutTemplate

class CompetitionSerializer(serializers.ModelSerializer):
    session_details = NestedSessionSerializer(source='sessions', many=True)
    exercise_details = NestedExerciseSerializer(source='exercises', many=True)
    participant_details = NestedUserSerializer(source='participants', many=True)
    class Meta:
        fields = (
            'creator',
            'exercises',
            'exercise_details',
            'participants',
            'participant_details',
            'start_date',
            'stop_date',
            'notes',
            'sessions',
            'session_details',
        )
        model = Competition

# class FriendRequestSerializer(serializers.ModelSerializer):
#     class Meta: 
#         fields = (
#             'from_user',
#             'to_user',
#         )
#         # model = FriendRequest

