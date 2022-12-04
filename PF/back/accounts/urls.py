from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from accounts.views import RegisterView
# from accounts.views import MyObtainTokenPairView
from accounts.views import LoginView
from accounts.views import UpdateProfileView, AccountView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.views import LogOutView

app_name = 'accounts'

urlpatterns = [
    path('get/', AccountView.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('login/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogOutView.as_view(), name='logout'),
    path('edit/', UpdateProfileView.as_view(), name='edit'),
]
