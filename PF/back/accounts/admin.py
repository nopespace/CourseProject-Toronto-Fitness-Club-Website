# from django.contrib import admin

# # Register your models here.
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import User

# from accounts.models import MyUser

# # Define an inline admin descriptor for Employee model
# # which acts a bit like a singleton
# class MyUserInline(admin.StackedInline):
#     model = MyUser
#     can_delete = False
#     verbose_name_plural = 'myuser'

# # Define a new User admin
# class UserAdmin(BaseUserAdmin):
#     inlines = [MyUserInline]

# # Re-register UserAdmin
# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from .models import User

class UserAdmin(admin.ModelAdmin):
    model = User
    fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'is_active']
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'is_active']

admin.site.register(User, UserAdmin)