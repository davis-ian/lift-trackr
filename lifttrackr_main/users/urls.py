from django.urls import path
from .views import SignUpView, accept_friend_request, send_friend_request
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('accounts/reset_password/',auth_views.PasswordResetView.as_view(template_name="password_reset.html"), name="reset_password" ),
    path('accounts/reset_password_sent_/', auth_views.PasswordResetDoneView.as_view(template_name="password_reset_sent.html"), name="password_reset_done"),
    path('accounts/reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_form.html"), name="password_reset_confirm"),
    path('accounts/reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_done.html"), name="password_reset_complete"),
    path('history', TemplateView.as_view(template_name='history.html'), name='history' ),
    path('workout_templates', TemplateView.as_view(template_name='workout_templates.html'), name='workout_templates'),
    path('profile', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('send_friend_request/<int:userID>/', send_friend_request, name='send friend request'),
    path('accept_friend_request/<int:requestID>/', accept_friend_request, name='accept friend request'),
    path('competitions/', TemplateView.as_view(template_name='competitions.html'), name='competitions'),
    
]