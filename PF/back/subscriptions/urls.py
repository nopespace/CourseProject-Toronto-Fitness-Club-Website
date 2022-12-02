from django.urls import path

from subscriptions.views import *

app_name = 'Subscriptions'

urlpatterns = [
    path('card/add/', CreateUserCardView.as_view()),
    path('card/update/', UpdateUserCardView.as_view()),
    path('list/', ListSubscriptionView.as_view()),
    path('add/', AddSubscriptionView.as_view()),
    path('update/', UpdateSubscriptionView.as_view()),
    path('paymentsHistory/', PaymentHistoryView.as_view()),
    # # list a specific studio's all subscription plans
    # path('list/<int:studio_id>/', ListStudioSubscriptionsView.as_view()),
    # # list a user's all subscriptions from all studios
    # path('list/user/', ListUserSubscriptionsView.as_view()),
    # # retrieve a user's subscription (only one) from a specific studio
    # path('retrieve/<int:studio_id>/', RetrieveUserSubscriptionView.as_view()),
]
