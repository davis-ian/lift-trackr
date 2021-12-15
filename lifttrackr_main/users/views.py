from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic.edit import CreateView
from .models import CustomUser

from .forms import CustomUserCreationForm

# Create your views here.
class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

def send_friend_request(request, userID):
    from_user = CustomUser.objects.get(id=request.user.id)
    to_user = CustomUser.objects.get(id=userID)
    # friend_request, created = FriendRequest.objects.get_or_create(from_user=from_user, to_user=to_user)
    from_user.request_out.add(to_user)
    from_user.save()
    return HttpResponseRedirect(reverse_lazy('profile'))
    # if created:
    #     return HttpResponse('Friend request sent')
    # else: 
    #     return HttpResponse('Friend request already sent')

def accept_friend_request (request, requestID):
    # friend_request = FriendRequest.objects.get(id=requestID)
    from_user = CustomUser.objects.get(id=request.user.id)
    to_user = CustomUser.objects.get(id=requestID)
    to_user.request_out.remove(from_user)
    to_user.friends.add(from_user)
    from_user.friends.add(to_user)
    to_user.save()
    from_user.save()
    return HttpResponseRedirect(reverse_lazy('profile'))

