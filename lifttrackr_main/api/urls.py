from django.urls import path


from .views import CompetitionViewSet, ExerciseInstanceViewSet, UserCompScoreViewSet, WorkoutTemplateViewSet, UserViewSet, ExerciseViewSet, CategoryViewSet, SessionViewSet, ExerciseInstanceViewSet, SetInstanceViewSet, CurrentUserView, CompExerciseViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('exercises', ExerciseViewSet, basename='exercises')
router.register('categories', CategoryViewSet, basename='categories')
router.register('sessions', SessionViewSet, basename='sessions')
router.register('exerciseinstances', ExerciseInstanceViewSet, basename='exerciseinstance')
router.register('setinstances', SetInstanceViewSet, basename='setinstance')
router.register('templates', WorkoutTemplateViewSet, basename='templates')
router.register('competitions', CompetitionViewSet, basename='competitions')
router.register('compworkouts', CompExerciseViewSet, basename='compworkouts')
router.register('usercompscores', UserCompScoreViewSet, basename='usercompscores')
# router.register('friendrequests', FriendRequestViewSet, basename="friendrequests")

urlpatterns = router.urls + [
    path('currentuser/', CurrentUserView.as_view(),)
]