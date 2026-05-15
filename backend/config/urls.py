from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import MyTokenObtainPairView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/token/', MyTokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),   
    path('api/chatbot/', include('chatbot.urls')),
]