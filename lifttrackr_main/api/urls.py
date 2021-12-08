from django.urls import path


from .views import ExerciseInstanceViewSet, UserViewSet, ExerciseViewSet, CategoryViewSet, SessionViewSet, ExerciseInstanceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('exercises', ExerciseViewSet, basename='exercises')
router.register('categories', CategoryViewSet, basename='categories')
router.register('sessions', SessionViewSet, basename='sessions')
router.register('exerciseinstances', ExerciseInstanceViewSet, basename='exerciseinstance')

urlpatterns = router.urls