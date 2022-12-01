from django.db import models
from studios.models import Studio
from accounts.models import User
from django.core.validators import MinValueValidator
# Create your models here.

# A subsciription plan for a studio (a studio can have multiple plans)
class SubscriptionPlan(models.Model):
    class Meta:
        verbose_name = 'Gym Subscription Plan'
        verbose_name_plural = 'Gym Subscription Plans'

    CYCLE_CHOICES = (
        ('monthly', 'monthly'),
        ('yearly', 'yearly'),
    )
    price = models.DecimalField(validators=[MinValueValidator(0.0)], max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=10, choices=CYCLE_CHOICES)
    # studio = models.ForeignKey(Studio, related_name="subscriptions", on_delete=models.CASCADE)
    # user = models.ManyToManyField(User, related_name="subscriptions")

    def __str__(self):
        return f"${self.price} {self.billing_cycle}"

# User's all subscriptions
# User can subscribe to only one plan
class UserSubscription(models.Model):
    # start_date = models.DateField()
    next_billing_date = models.DateField()  # = end of current period
    cancelled = models.BooleanField(default=False)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}: {self.plan}"

# User's credit/debit card info
class UserCard(models.Model):
    class Meta:
        verbose_name = 'User payment card'
        verbose_name_plural = 'User payment cards'
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    card_num = models.CharField(max_length=16)
    cardholder = models.CharField(max_length=100)
    expiry_date = models.DateField()
    CVV = models.CharField(max_length=3)

    def  __str__(self):
        return f"{self.user} : card number: {self.card_num}"

# user payment history
class UserPaymentHistory(models.Model):
    amount = models.DecimalField(validators=[MinValueValidator(0.0)], max_digits=10, decimal_places=2)
    billing_datetime = models.DateTimeField()
    card_num = models.CharField(max_length=16)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"amount: {self.amount}, date: {self.billing_datetime}, card_num: {self.card_num}"
