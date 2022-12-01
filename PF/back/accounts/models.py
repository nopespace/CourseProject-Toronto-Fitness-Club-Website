from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
from django import forms


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    phone_regex = RegexValidator(regex=r'^[0-9]{3}-[0-9]{3}-[0-9]{4}$', message="Phone number must be entered in the format: 'xxx-xxx-xxxx'.")
    phone_number = models.CharField(validators=[phone_regex], max_length=12, help_text="e.g. 123-123-1234")
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    is_active = models.BooleanField(default=True)