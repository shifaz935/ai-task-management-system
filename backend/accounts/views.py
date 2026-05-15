from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import MyTokenObtainPairSerializer
@api_view(['POST'])
def registerUser(request):

    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role")

    if CustomUser.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    user = CustomUser.objects.create_user(
        username=username,
        password=password,
        role=role
    )

    return Response({
        "message": "User Registered Successfully"
    })

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def login_view(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role,
            "user": {
                "id": user.id,
                "username": user.username
            }

        })

    return Response({
        'error': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)