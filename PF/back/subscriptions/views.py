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
from tfc.paginations import LargeResultsSetPagination

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
        # print("debugging")
        # print(self.request)
        # print(type(self.request.POST.get('cancelled')))
        if self.request.method == 'PUT' and self.request.POST.get('cancelled') == 'true':
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
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):
        user_obj = self.request.user
        return UserPaymentHistory.objects.filter(user=user_obj)
    

class PaymentFutureView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSubscriptionSerializer

    def get_object(self):
        return get_object_or_404(
            UserSubscription, 
            user=self.request.user
            )

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, args, kwargs)
        result = {}
        print(333, response.data)
        if response.data["cancelled"]:
            result['next_billing_date'] = None
        else:
            result['next_billing_date'] = response.data["next_billing_date"]
            result['next_billing_amount'] = response.data["price"]
        return Response(result, status=status.HTTP_200_OK)