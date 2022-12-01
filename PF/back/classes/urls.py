from django.urls import path

from classes.views import *

app_name = 'Klasses'

urlpatterns = [
    path('schedule/<int:studio_id>/', ListClassView.as_view()),
    path('enroll/', EnrollClassView.as_view()),
    path('drop/', DropClassView.as_view()),
    path('search/', SearchClassView.as_view()),
    path('user/future/schedule/', UserScheduleView.as_view()),
    path('user/past/schedule/', UserClassHistoryView.as_view()),
]


# from django.urls import path

# from classes.views import *

# app_name = 'Klasses'

# urlpatterns = [
#     path('',KlassesView.as_view()),
#     # path('enroll/', EnrollView.as_view()),
#     # path('drop/', DropView.as_view()),
#     # path('schedule/', ScheduleView.as_view()),
#     # path('list/search/', SearchKlassView.as_view()),
# ]
