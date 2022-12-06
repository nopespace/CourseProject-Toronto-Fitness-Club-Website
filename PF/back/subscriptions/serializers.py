from rest_framework import serializers

from subscriptions.models import *
from classes.models import *
from datetime import datetime, date, timedelta
from dateutil import relativedelta
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
import pytz
from django.db import IntegrityError
from rest_framework.exceptions import APIException

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = [
            "id",
            "price",
            "billing_cycle", 
            # "studio", 
            # "user"
            ]

class UserSubscriptionSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(source='plan.price', max_digits=10, decimal_places=2,read_only=True)
    billing_cycle = serializers.CharField(source='plan.billing_cycle',read_only=True)
    plan_id = serializers.CharField(source='plan.id')
    class Meta:
        model = UserSubscription
        read_only_fields = ["price",
            "billing_cycle",
            "next_billing_date", "cancelled"]
        fields = [
            "plan_id",
            "price",
            "billing_cycle",
            # "start_date",
            "next_billing_date",
            "cancelled"
            ]
        extra_kwargs = {'price': {'required': False}, 'billing_cycle':{'required':False}}
        
    def create(self, validated_data):
        try: 
            self.context['request'].user.usercard

        except:
            raise APIException(detail="Please add payment card first.")
        new_plan = SubscriptionPlan.objects.get(id=validated_data['plan']['id'])
        # make the first payment
        s = UserPaymentHistorySerializer()
        try:
            user_plan = super().create({
            'next_billing_date': s.get_next_billing_date(new_plan.billing_cycle),
            'user': self.context['request'].user, 
            'plan': new_plan
            })
            s.makePayment(user_plan=user_plan)
        
            return user_plan
        except IntegrityError:
            detail = """You already have a plan, cannot add another one. Please redirect to update API to update your plan."""
            raise APIException(detail=detail)


    
    def update(self, instance, validated_data):
        # print("meow")
        # print(instance.cancelled)
        s = UserPaymentHistorySerializer()
        new_plan = SubscriptionPlan.objects.get(id=validated_data['plan']['id'])
        instance.plan = new_plan
        # instance.start_date = date.today()
        if instance.cancelled == True: # user has no plan or current will end, so charge immediately
            end = instance.next_billing_date
            if end < date.today():  # user has no plan, i.e. most recent bill ends already
                instance.cancelled = False
                s.get_next_billing_date(new_plan.billing_cycle)
                s.makePayment(instance)
            else:
                instance.cancelled = False
        instance.save()

        return instance

class CancelUserSubscriptionSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(source='plan.price', max_digits=10, decimal_places=2, read_only=True)
    billing_cycle = serializers.CharField(source='plan.billing_cycle', read_only=True)
    plan_id = serializers.CharField(source='plan.id')

    class Meta:
        model = UserSubscription
        read_only_fields = ["next_billing_date", "cancelled"]
        fields = [
            "plan_id",
            "price",
            "billing_cycle",
            "next_billing_date",
            "cancelled"
            ]
    
    def update(self, instance, validated_data):
        instance.cancelled = True
        instance.save()

        invalid_enrols = Enrolled.objects.filter(
            user=self.context['request'].user, 
            klass_instance__date__gt=instance.next_billing_date)
        
        for invalid_enrol in invalid_enrols:
            class_ins = invalid_enrol.klass_instance
            class_ins.num_students -= 1
            class_ins.save()
            invalid_enrol.delete()

        return instance

class UserCardSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserCard
        fields = [
            'card_num',
            'cardholder',
            'expiry_date',
            'CVV',
        ]
    
    def create(self, validated_data):
        try:
            return super().create(validated_data | {'user': self.context['request'].user})
        except IntegrityError:
            detail = """You already have a card, cannot add another one. Please redirect to update API to update your card."""
            raise APIException(detail=detail)

class UserPaymentHistorySerializer(serializers.ModelSerializer):
    # next_billing_date = serializers.DateField(source='user.usersubscription.next_billing_date', read_only=True)
    class Meta:
        model = UserPaymentHistory
        fields = [
            'id',
            'amount',
            'billing_datetime',
            'card_num',
            # 'next_billing_date'
        ]
    
    # payment script
    def makePayment(self,user_plan=None,today=date.today()):
        if user_plan:   # user first subscribes, so charge immediately
            super().create(
                    {
                        'amount': user_plan.plan.price,
                        'billing_datetime': timezone.now(),
                        'card_num':user_plan.user.usercard.card_num,
                        'user': user_plan.user
                    }
                )
        else:
            user_plans = UserSubscription.objects.all()
            for user_plan in user_plans:
                if user_plan.next_billing_date == today and user_plan.cancelled == False:
                    # pay: same as add to payment history table

                    super().create(
                        {
                            'amount': user_plan.plan.price,
                            'billing_datetime': timezone.now(),
                            'card_num':user_plan.user.usercard.card_num,
                            'user': user_plan.user
                        }
                    )
                    # update next_billing_date
                    user_plan.next_billing_date = self.get_next_billing_date(user_plan.plan.billing_cycle)
                    user_plan.save()
                

    # helper for make payment
    def get_next_billing_date(self,billing_cycle):
        if billing_cycle == 'weekly':
            next_billing_date = date.today() + timedelta(weeks=1)
        elif billing_cycle == 'monthly':
            next_billing_date = date.today() + relativedelta.relativedelta(months=1)
        else:   #'yearly'
            next_billing_date = date.today() + relativedelta.relativedelta(years=1)
        return next_billing_date
    