from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

from accounts.serializers import UserSerializer
from classes.models import *
from classes.serializers import *

import datetime

from logging import warning

from subscriptions.models import UserSubscription

# list class schedule of a specific studio
from tfc.paginations import LargeResultsSetPagination

class ListClassView(ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = KlassInstanceSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        classes = KlassInstance.objects.filter(
            base_klass__studio__pk=self.kwargs['studio_id'],
            date__gte=datetime.date.today()).order_by('date', 'base_klass__start_time')
        for c in classes:
            if c.date == datetime.date.today() and c.base_klass.start_time < datetime.datetime.now().time():
                classes.filter(id=c.id).delete()
        return classes


class EnrollClassView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EnrolledSerializer

    def post(self, request, format=None):
        user = self.request.user
        class_id = request.data['class_id']  # refers to BaseClass
        start_date = datetime.datetime.strptime(
            request.data.get("date"), '%Y-%m-%d').date()
        all_ = request.data.get('all')

        # check if user has active subscription plan
        try:
            user_plan = UserSubscription.objects.get(user=user)
        except ObjectDoesNotExist:
            return Response({'msg': 'Please subscribe to our application first.'}, status=status.HTTP_401_UNAUTHORIZED)

        if user_plan.cancelled and datetime.date.today() > user_plan.next_billing_date:
            # user has no plan now
            return Response({'msg': 'Please subscribe to our application first.'}, status=status.HTTP_401_UNAUTHORIZED)
        if str(all_).lower() == 'true':  # subscribe to all future occurences
            end_date = BaseKlass.objects.get(id=class_id).end_date
            if user_plan.cancelled:  # now, user ends plan at next_billing_date
                # can only enroll courses before current plan ends
                end_date = min(end_date, user_plan.next_billing_date)
        else:   # subscribe to a specific date
            if user_plan.cancelled and start_date > user_plan.next_billing_date:
                return Response({'msg': 'This class is beyond your subscription period. Please subscribe first.'}, status=status.HTTP_401_UNAUTHORIZED)
            end_date = start_date
        # print(end_date,123, type(all_))
        # enroll
        date = start_date
        while date <= end_date:
            # find class instance on this date
            if not KlassInstance.objects.filter(base_klass__pk=class_id, date=date).exists():
                date += datetime.timedelta(weeks=1)
                continue
            class_ins = KlassInstance.objects.get(
                base_klass__pk=class_id, date=date)
            num_students = class_ins.num_students
            already = Enrolled.objects.filter(
                klass_instance__pk=class_ins.id, user=self.request.user).exists()
            # check if user hasn't enrolled in this class instance, and class has capacity
            if not already and num_students < class_ins.base_klass.capacity:
                serializer = EnrolledSerializer(data={
                    'klass_instance': class_ins.id,
                    'user': user.pk
                })
                if serializer.is_valid():
                    serializer.save()
                    # print(serializer.data,222)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                class_ins.num_students += 1
                class_ins.save()
            date += datetime.timedelta(weeks=1)
        return Response({
            'msg': 'Please check your class schedule. If you aren\'t successfully enrolled, that means the class is full. '
        }, status=status.HTTP_201_CREATED)


class DropClassView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EnrolledSerializer

    def post(self, request, format=None):
        user = self.request.user
        class_id = request.data['class_id']  # refers to BaseClass
        start_date = datetime.datetime.strptime(
            request.data.get("date"), '%Y-%m-%d').date()
        all_ = request.data.get('all')

        # check if user has active subscription plan
        try:
            user_plan = UserSubscription.objects.get(user=user)
        except ObjectDoesNotExist:
            return Response({'msg': 'Please subscribe to our application first.'}, status=status.HTTP_401_UNAUTHORIZED)

        if user_plan.cancelled and datetime.date.today() > user_plan.next_billing_date:
            # user has no plan now
            return Response({'msg': 'Please subscribe to our application first.'}, status=status.HTTP_401_UNAUTHORIZED)

        if str(all_) == 'True':  # drop all future occurences
            end_date = BaseKlass.objects.get(id=class_id).end_date
        else:   # drop a specific date
            end_date = start_date

        date = start_date
        while date <= end_date:
            # find class instance on this date
            class_ins = KlassInstance.objects.get(
                base_klass__pk=class_id, date=date)
            enrolled_class = Enrolled.objects.filter(
                klass_instance__pk=class_ins.id, user=self.request.user)
            if enrolled_class.exists():
                enrolled_class.delete()
                class_ins.num_students -= 1
                class_ins.save()
            date += datetime.timedelta(weeks=1)

        return Response({'msg': 'Success. Please check your enrollment schedule.'}, status=status.HTTP_200_OK)


class SearchClassView(ListAPIView):
    serializer_class = KlassInstanceSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        d = {
            'class name': 'base_klass__name',
            'coach name': 'base_klass__coach',
            'date': 'date',  # which day in a week
        }

        studio_id = self.request.query_params.get('studio_id')   # which studio
        criterion = self.request.query_params.get(
            'criterion')    # which option (e.g coach name)
        try:
            studio = Studio.objects.get(id=studio_id)
        except:
            raise NotFound("This studio does not exist.")

        if criterion == 'class name' or criterion == 'coach name' or criterion == 'date':
            kw = self.request.query_params.get('keyword')   # what keyword
            if criterion == 'class name' or criterion == 'coach name':
                # which option (e.g coach name)
                criterion_contain = d[criterion] + '__contains'
                classes =  KlassInstance.objects.filter(**{criterion_contain: kw, 'base_klass__studio': studio}, date__gte=datetime.date.today(),
                                                    ).order_by('date', 'base_klass__start_time')
                for c in classes:
                    if c.date == datetime.date.today() and c.base_klass.start_time < datetime.datetime.now().time():
                        classes.filter(id=c.id).delete()
                return classes
            elif criterion == 'date':
                criterion_contain = d[criterion]
                classes = KlassInstance.objects.filter(**{criterion_contain: kw, 'base_klass__studio': studio}, date__gte=datetime.date.today(),).order_by('date', 'base_klass__start_time')
                for c in classes:
                    if c.date == datetime.date.today() and c.base_klass.start_time < datetime.datetime.now().time():
                        classes.filter(id=c.id).delete()
                return classes
        elif criterion == 'date range':
            criterion_contain = d['date']
            start_date = self.request.query_params.get('start_var')
            end_date = self.request.query_params.get('end_var')
            format = "%Y-%m-%d"
            start = datetime.datetime.strptime(start_date, format).date()
            end = datetime.datetime.strptime(end_date, format).date()
            ans = []
            for i in range(0, (end - start).days + 1):
                kw = start + datetime.timedelta(days=i)
                ans.extend(KlassInstance.objects.filter(**{criterion_contain: kw, 'base_klass__studio': studio}, date__gte=datetime.date.today()
                                                        ).order_by('date', 'base_klass__start_time'))
            for c in ans:
                if c.date == datetime.date.today() and c.base_klass.start_time < datetime.datetime.now().time():
                    ans.remove(c)
            return ans
        elif criterion == 'time range':
            start_time = self.request.query_params.get('start_var')
            end_time = self.request.query_params.get('end_var')
            format = "%H:%M"
            start = datetime.datetime.strptime(start_time, format).time()
            end = datetime.datetime.strptime(end_time, format).time()
            classes = KlassInstance.objects.filter(date__gte=datetime.date.today(), base_klass__start_time__gte=start, base_klass__end_time__lte=end,
                                                base_klass__studio=studio).order_by('date', 'base_klass__start_time')
            for c in classes:
                    if c.date == datetime.date.today() and c.base_klass.start_time < datetime.datetime.now().time():
                        classes.filter(id=c.id).delete()
            return classes

class UserScheduleView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EnrolledSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        enrolls = Enrolled.objects.filter(
            user=self.request.user,
            klass_instance__date__gte=datetime.date.today()).order_by('klass_instance__date', 'klass_instance__base_klass__start_time')

        for enroll in enrolls:
            if enroll.klass_instance.date == datetime.date.today() and enroll.klass_instance.base_klass.start_time <= datetime.datetime.now().time():
                enrolls.filter(id=enroll.id).delete()
        return enrolls


class UserClassHistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EnrolledSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        past = Enrolled.objects.filter(
            user=self.request.user,
            klass_instance__date__lte=datetime.date.today()).order_by('klass_instance__date', 'klass_instance__base_klass__start_time')

        for c in past:
            if c.klass_instance.date == datetime.date.today() and c.base_klass.start_time > datetime.datetime.now().time():
                past.filter(id=c.id).delete()
        return past
