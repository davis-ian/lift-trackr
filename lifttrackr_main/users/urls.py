from django.urls import path
from .views import SignUpView, accept_friend_request, send_friend_request, CompetitionDetailView
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views


app_name = 'users'

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),

    path('reset_password/',auth_views.PasswordResetView.as_view(template_name="registration/password_reset.html"), name="reset_password" ),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name="registration/password_reset_done.html"), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="registration/password_reset_confirm.html", success_url='password_reset_complete'), name="password_reset_confirm"),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="registration/password_reset_complete.html"), name="password_reset_complete"),

    path('history', TemplateView.as_view(template_name='history.html'), name='history' ),
    path('workout_templates', TemplateView.as_view(template_name='workout_templates.html'), name='workout_templates'),
    path('profile', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('send_friend_request/<int:userID>/', send_friend_request, name='send friend request'),
    path('accept_friend_request/<int:requestID>/', accept_friend_request, name='accept friend request'),
    path('competition_detail/<int:pk>/', CompetitionDetailView.as_view(), name='competition_detail'),
    path('competitions/', TemplateView.as_view(template_name='competitions.html'), name='competitions'),
    path('friends', TemplateView.as_view(template_name='friends.html'), name='friends'),
]