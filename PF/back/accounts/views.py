from collections import UserList
from http.client import HTTPResponse
from django.shortcuts import render
from django.contrib.auth import login
from accounts.models import User
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, HttpResponseNotFound, JsonResponse
from django.template.response import TemplateResponse
from django.views import View
from django.views.generic import FormView, RedirectView
from django.contrib.auth import logout
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.generic import TemplateView, ListView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from accounts.serializers import LoginSerializer
from accounts.serializers import UpdateProfileSerializer
from rest_framework import status
from django.contrib.auth import authenticate, login
from logging import warn


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer


class AccountView(APIView):
    def get(self, request):
        try:
            return JsonResponse(UserSerializer(request.user).data)
        except:
            return Response({"error": "Please log in."}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(TokenObtainPairView):

    permission_classes = (AllowAny,)

    def post(self, request):
        if request.user.is_authenticated:
            return Response({'detail': 'You are already authenticated'}, status=status.HTTP_400_BAD_REQUEST)

        username = request.data.get("username", None)
        password = request.data.get("password", None)
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        if not str(refresh.access_token):
            return Response({"error": "Generate Token failed once"}, status=status.HTTP_400_BAD_REQUEST)
        response = {
            'success': 'True',
            'status code': status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'token': str(refresh.access_token),
        }
        status_code = status.HTTP_200_OK

        try:
            login(request, User.objects.get(username=request.data['username']))
        except:
            response['message'] = 'User not found'
            status_code = status.HTTP_404_NOT_FOUND

        return Response(response, status=status_code)


class LogOutView(APIView):
    def get(self, request, format=None):
        logout(request)
        return HttpResponse("You have been logged out.")


class UpdateProfileView(UpdateAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)
