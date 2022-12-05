from rest_framework import serializers

from classes.models import *


class KlassInstanceSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(
        source='base_klass.name', read_only=True)
    description = serializers.CharField(
        source='base_klass.description', read_only=True)
    coach_name = serializers.CharField(
        source='base_klass.coach', read_only=True)
    keywords = serializers.CharField(
        source='base_klass.keywords', read_only=True)
    start_time = serializers.TimeField(
        source='base_klass.start_time', read_only=True)
    end_time = serializers.TimeField(
        source='base_klass.end_time', read_only=True)
    capacity = serializers.IntegerField(
        source='base_klass.capacity', read_only=True)
    start_date = serializers.DateField(
        source='base_klass.start_date', read_only=True)
    end_date = serializers.TimeField(
        source='base_klass.end_date', read_only=True)

    class Meta:
        model = KlassInstance
        fields = [
            'id',
            'class_name',
            'description',
            'coach_name',
            'keywords',
            'date',
            'start_time',
            'end_time',
            'num_students',
            'capacity',
            'base_klass',
            'start_date',
            'end_date'
        ]


class CancelledKlassInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CancelledKlassInstance
        fields = [
            'base_klass',
            'date',
            'num_students'
        ]


class EnrolledSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(
        source='klass_instance.base_klass.name', read_only=True)
    coach_name = serializers.CharField(
        source='klass_instance.base_klass.coach', read_only=True)
    date = serializers.CharField(source='klass_instance.date', read_only=True)
    start_time = serializers.TimeField(
        source='klass_instance.base_klass.start_time', read_only=True)
    end_time = serializers.TimeField(
        source='klass_instance.base_klass.end_time', read_only=True)

    class Meta:
        model = Enrolled
        fields = [
            'class_name',
            'coach_name',
            'date',
            'start_time',
            'end_time',
            'klass_instance',
            'user']
