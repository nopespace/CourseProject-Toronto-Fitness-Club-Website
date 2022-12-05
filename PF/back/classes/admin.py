from django.contrib import admin

from classes.models import *
import datetime
from classes.serializers import KlassInstanceSerializer, CancelledKlassInstanceSerializer

class KlassInstanceInLine(admin.TabularInline):
    model = KlassInstance
    # readonly_fields = ['date']
    readonly_fields = ['date','num_students']
    # fields = ['date', 'num_students']
    ordering = ['date']

class CancelledKlassInstanceInLine(admin.TabularInline):
    model = CancelledKlassInstance
    # readonly_fields = ['date']
    readonly_fields = ['date','num_students']
    # fields = ['date', 'num_students']
    ordering = ['date']

class BaseKlassAdmin(admin.ModelAdmin):
    model = BaseKlass
    fields = [
        "studio",
        "name",
        "description",
        "coach",
        "keywords",
        "capacity",
        "start_date",
        "end_date",
        "start_time",
        "end_time",
        # "add_all_instances"
    ]

    inlines = [
        KlassInstanceInLine,
        CancelledKlassInstanceInLine]

    list_display = [
        "id",
        "name",
        "studio",
        "description",
        "coach",
        "keywords",
        "capacity"
    ]

    def save_formset(self, request, form, formset, change):
        for inline_form in formset.forms:
            if inline_form.has_changed():
                serializer = CancelledKlassInstanceSerializer(
                    data={'base_klass': inline_form.instance.base_klass.pk,
                    'date':inline_form.instance.date,
                    'num_students':inline_form.instance.num_students,})
                if serializer.is_valid():
                    serializer.save()

            super().save_formset(request, form, formset, change)

    def save_model(self, request, obj, form, change):
        try:
            ori_base_klass = BaseKlass.objects.get(id=form.instance.id)
            ori_start_date = ori_base_klass.start_date
            ori_start_time = ori_base_klass.start_time
            ori_end_time = ori_base_klass.end_time

            # delete all existing class instances, if start_date, start_time, end_time changes
            if (
                ori_start_date != form.instance.start_date or 
                ori_start_time != form.instance.start_time or
                ori_end_time != form.instance.end_time):
                KlassInstance.objects.filter(base_klass=ori_base_klass).delete()
                CancelledKlassInstance.objects.filter(base_klass=ori_base_klass).delete()
        except:
            pass
        # save new base class
        super().save_model(request, obj, form, change)
        data = form.cleaned_data
        base_klass = BaseKlass.objects.get(id=form.instance.id)
        start = base_klass.start_date
        print(start, 222)
        end = base_klass.end_date

        while start <= end:
            validated_data = {
                'date': start,
                'base_klass': base_klass.pk,
                'num_students':0
            }
            cancelled = CancelledKlassInstance.objects.filter(base_klass=base_klass, date=start).exists()
            existed = KlassInstance.objects.filter(base_klass=base_klass, date=start).exists()
            if not cancelled and not existed:
                serializer = KlassInstanceSerializer(data=validated_data)
                if serializer.is_valid():
                    serializer.save()
            start = start + datetime.timedelta(days=7)

        # Delete all classes that happen after
        end = base_klass.end_date
        KlassInstance.objects.filter(date__gt=end, base_klass=base_klass).delete()

class EnrolledAdmin(admin.ModelAdmin):
    model = Enrolled
    fields = ['klass_instance', 'user']
    list_display = ['id', 'klass_instance', 'user']

admin.site.register(BaseKlass, BaseKlassAdmin)

# TODO: comment this, enrolled is only used for testing
# admin.site.register(Enrolled, EnrolledAdmin)


# -- by simon
# class KlassInstanceAdmin(admin.ModelAdmin):
#     model = KlassInstance
#     fields = [
#         'base_klass'
#         'date'
#     ]
# admin.site.register(KlassInstance, KlassInstanceAdmin)


# from django.contrib import admin
# from nested_inline.admin import NestedModelAdmin, NestedTabularInline

# from classes.models import *


# class CancellationsInLine(NestedTabularInline):
#     model = Cancellation


# class TimeInLine(NestedTabularInline):
#     model = Time
#     inlines = [
#         CancellationsInLine
#     ]


# class KlassAdmin(NestedModelAdmin):
#     model = Klass
#     fields = [
#         "studio",
#         "name",
#         "description",
#         "coach",
#         "keywords",
#         "capacity"
#     ]
#     inlines = [
#         TimeInLine
#     ]
#     list_display = [
#         "studio",
#         "name",
#         "description",
#         "coach",
#         "keywords",
#         "capacity"
#     ]


# class DropInLine(NestedTabularInline):
#     model = Drop


# class EnrolledAdmin(NestedModelAdmin):
#     model = Enrolled
#     fields = [
#         "klass",
#         "user",
#         "start_date",
#         "end_date"
#     ]
#     inlines = [
#         DropInLine
#     ]
#     list_display = [
#         "klass",
#         "user",
#         "start_date",
#         "end_date"
#     ]


# admin.site.register(Enrolled, EnrolledAdmin)
