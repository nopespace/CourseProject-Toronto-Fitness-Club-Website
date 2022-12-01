from django.urls import path

from studios.views import *

app_name = 'Studios'

urlpatterns = [
    path('list/', ListStudiosView.as_view()),
    # path('list/search/', ListStudiosView.as_view()),
    path('<int:studio_id>/', StudioView.as_view())
]
