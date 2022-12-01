from django.contrib import admin
from subscriptions.models import *

# Register your models here.    

class SubscriptionAdmin(admin.ModelAdmin):
    model = SubscriptionPlan
    fields = ['price', 'billing_cycle']
    list_display = ['id', 'price', 'billing_cycle']

class UserPlanAdmin(admin.ModelAdmin):
    model = UserSubscription
    fields = ['user', 'plan', 'next_billing_date', 'cancelled']
    list_display = ['user', 'plan', 'next_billing_date', 'cancelled']

class UserCardAdmin(admin.ModelAdmin):
    model = UserCard
    fields = ['user', 'card_num', 'expiry_date', 'CVV', 'cardholder']
    list_display = ['user', 'card_num', 'expiry_date', 'CVV', 'cardholder']

admin.site.register(SubscriptionPlan, SubscriptionAdmin)

# TODO: comment below, only used for testing
# admin.site.register(UserSubscription, UserPlanAdmin)
# admin.site.register(UserCard, UserCardAdmin)

