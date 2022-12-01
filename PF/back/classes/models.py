import json
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from tfc.settings import AUTH_USER_MODEL
from accounts.models import User

from studios.models import Studio

class BaseKlass(models.Model):
    class Meta:
        verbose_name = 'Class'
        verbose_name_plural = 'Classes'
    studio = models.ForeignKey(
        Studio, related_name="base_klass", on_delete=models.CASCADE)
    name = models.CharField(unique=True, max_length=200)
    description = models.TextField(max_length=400)
    coach = models.CharField(max_length=200)
    keywords = models.TextField(max_length=400, blank=True)
    capacity = models.PositiveIntegerField()

    start_time = models.TimeField()
    end_time = models.TimeField()

    start_date = models.DateField()
    end_date = models.DateField()

    # add_all_instances = models.BooleanField(default=False, help_text='Choose if you want to add all class instances between start, end date')

    def __str__(self):
        return f"{self.name} start on {self.start_date} and ends on {self.end_date}"

class KlassInstance(models.Model):
    class Meta:
        verbose_name = 'Class instance'
        verbose_name_plural = 'Class instances'
    base_klass = models.ForeignKey(BaseKlass, related_name="klass_instance", on_delete=models.CASCADE)
    date = models.DateField()
    num_students = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.base_klass.name} from {self.base_klass.start_time} to {self.base_klass.end_time} on {self.date}"

# record courses cancelled by admin
class CancelledKlassInstance(models.Model):
    class Meta:
        verbose_name = 'Cancelled Class instance'
        verbose_name_plural = 'Cancelled Class instances'
    base_klass = models.ForeignKey(BaseKlass, on_delete=models.CASCADE)
    date = models.DateField()
    num_students = models.PositiveIntegerField()

    def __str__(self):
        return f"Cancelled: {self.base_klass.name} from {self.base_klass.start_time} to {self.base_klass.end_time} on {self.date}"

class Enrolled(models.Model):
    klass_instance = models.ForeignKey(KlassInstance, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)