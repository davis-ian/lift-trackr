




from users.models import CustomUser
from exercises.models import Exercise, Category, Session, ExerciseInstance, SetInstance, WorkoutTemplate, Competition, CompExercise, UserCompScore
from rest_framework import serializers

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'id',
        )
        model = CustomUser

class NestedUserCompScoreSerializer(serializers.ModelSerializer):
    user_details = NestedUserSerializer(source='user')
    class Meta:
        fields = (
            'user',
            'competition',
            'score',
            'id',
            'user_details',
        )
        model = UserCompScore

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

class NestedCompExerciseSerializer(serializers.ModelSerializer):
    exercise_detail = NestedExerciseSerializer(source='exercise')
    class Meta: 
        fields = (
            'exercise',
            'exercise_detail',
            'exercise_points',
            'competition',
            'id',
        )
        model = CompExercise

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
        )
        model = ExerciseInstance

class NestedSessionSerializer(serializers.ModelSerializer):
    exercise_instance_detail = NestedExerciseInstanceSerializer(source='instances', many=True)
    user_detail = NestedUserSerializer(source='user', many=True)
    class Meta:
        fields = (
            'user',
            'user_detail',
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
            'competition',
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
    session_details = NestedSessionSerializer(source='sessions', many=True, read_only=True)
    participant_details = NestedUserSerializer(source='participants', many=True, read_only=True)
    comp_exercise_details = NestedCompExerciseSerializer(source='compexercises', many=True, read_only=True)
    score_details = NestedUserCompScoreSerializer(source='scores', many=True, read_only=True)
    class Meta:
        fields = (
            'title',
            'creator',
            'score_details',
            'participants',
            'participant_details',
            'comp_exercise_details',
            'start_date',
            'stop_date',
            'notes',
            'sessions',
            'session_details',
            'id',
        )
        model = Competition

class CompExerciseSerializer(serializers.ModelSerializer):
    exercise_detail = NestedExerciseSerializer(source='exercise', read_only=True)
    class Meta: 
        fields = (
            'exercise',
            'exercise_points',
            'competition',
            'exercise_detail',
            'id',
        )
        model = CompExercise

class UserCompScoreSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'user',
            'competition',
            'score',
            'id',
        )
        model = UserCompScore

