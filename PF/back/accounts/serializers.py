from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from accounts.models import User
import tfc.settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ('username', 'email', 'first_name', 'last_name', 'avatar', 'is_staff', 'is_active', 'phone_number')
        read_only_fields = ['superuser_status', 'last_login', 'date_joined', 'groups', 'user_permissions', 'is_superuser', 'is_staff', 'is_active']
        optional_fields = ['avatar', ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_password(self, value: str) -> str:
        return make_password(value)


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this username and password is not found.'
            )
        try:
            pass
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given username and password does not exists'
            )
        return {
            'user': user,
            'username': user.username,
        }


class UpdateProfileSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email', 'avatar', 'phone_number')
        optional_fields = ['username', 'first_name',
                           'last_name', 'email', 'avatar', 'phone_number']
        extra_kwargs = {
            'username': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': False},
            'avatar': {'required': False},
            'phone_number': {'required': False},
        }

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError(
                {"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError(
                {"username": "This username is already in use."})
        return value

    def update(self, instance, validated_data):
        if "username" in validated_data.keys():
            instance.username = validated_data['username']
        if "first_name" in validated_data.keys():
            instance.first_name = validated_data['first_name']
        if "last_name" in validated_data.keys():
            instance.last_name = validated_data['last_name']
        if "email" in validated_data.keys():
            instance.email = validated_data['email']
        if "phone_number" in validated_data.keys():
            instance.phone_number = validated_data['phone_number']
        if "avatar" in validated_data.keys():
            instance.avatar = validated_data['avatar']
        instance.save()

        return instance
