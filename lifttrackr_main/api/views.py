from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from exercises.models import Exercise, Category, Session, ExerciseInstance, SetInstance, WorkoutTemplate, Competition



from users.models import CustomUser
from .serializers import CategorySerializer, CompetitionSerializer, ExerciseInstanceSerializer, SessionSerializer, UserSerializer, ExerciseSerializer, SetInstanceSerializer, WorkoutTemplateSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user']

class ExerciseInstanceViewSet(viewsets.ModelViewSet):
    queryset = ExerciseInstance.objects.all()
    serializer_class = ExerciseInstanceSerializer

class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class SetInstanceViewSet(viewsets.ModelViewSet):
    queryset = SetInstance.objects.all()
    serializer_class = SetInstanceSerializer

class WorkoutTemplateViewSet(viewsets.ModelViewSet):
    queryset = WorkoutTemplate.objects.all()
    serializer_class = WorkoutTemplateSerializer

class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

# class FriendRequestViewSet(viewsets.ModelViewSet):
#     queryset = FriendRequest.objects.all()
#     serializer_class = FriendRequestSerializer
    
    