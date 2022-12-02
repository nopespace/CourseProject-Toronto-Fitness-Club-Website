from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from subscriptions.serializers import *
from rest_framework.response import Response
from decimal import Decimal
from accounts.serializers import UserSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

# add payment card
class CreateUserCardView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserCardSerializer

# edit payment card
class UpdateUserCardView(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserCardSerializer

    def get_object(self):
        return get_object_or_404(
            UserCard, 
            user=self.request.user
            )


# add subscription to a studio
class AddSubscriptionView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SubscriptionPlanSerializer
        else:
            return UserSubscriptionSerializer

    # def get_queryset(self):
    #     self.serializer_class = SubscriptionPlanSerializer
    #     return SubscriptionPlan.objects.all()

class ListSubscriptionView(ListAPIView):
    permission_classes = (AllowAny,)

    def get_queryset(self):
        self.serializer_class = SubscriptionPlanSerializer
        return SubscriptionPlan.objects.all()
    
    
class UpdateSubscriptionView(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSubscriptionSerializer
    def get_serializer_class(self):
        if self.request.method == 'PUT' and self.request.POST.get('cancelled', False).lower() == 'true':
            return CancelUserSubscriptionSerializer
        else:
            return UserSubscriptionSerializer

    def get_object(self):
        return get_object_or_404(
            UserSubscription, 
            user=self.request.user
            )


class PaymentHistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserPaymentHistorySerializer
    
    def get_queryset(self):
        user_obj = self.request.user
        return UserPaymentHistory.objects.filter(user=user_obj)
    
    def list(self, request, *args, **kwargs):
        user_obj = self.request.user
        response = super().list(request, args, kwargs)
        cancelled = UserSubscription.objects.get(user=user_obj).cancelled
        if cancelled:
            response.data.append({
                "next_billing_date": None,
                })
        else:
            response.data.append({
                "next_billing_date": UserSubscription.objects.get(user=user_obj).next_billing_date,
                "next_billing_amount": UserSubscription.objects.get(user=user_obj).plan.price
                })
        return response
