from django.urls import path
from .views import login_view , registerUser

urlpatterns = [
    path('login/', login_view),
    path('register/', registerUser),
]