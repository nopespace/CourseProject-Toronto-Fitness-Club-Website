from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from classes.serializers import *
from studios.serializers import StudioSerializer
from studios.models import *
from django.shortcuts import get_object_or_404
# import googlemaps as gm
# from tfc.settings import GOOGLE_API_KEY
from decimal import Decimal
from rest_framework.permissions import AllowAny
from classes.models import *
import json

# Create your views here.
# class ListStudiosView(APIView):
#     # authentication_classes = [authentication.TokenAuthentication]
#     # permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         search = request.GET['search'].replace('+', ' ')
#         print(search)
#         studios = Studio.objects.all()
#         serializer = StudioSerializer(studios, many=True)
#         return Response(serializer.data)
    
#     def post(self, request, format=None):
#         lat = float(request.data['lat'])
#         lon = float(request.data['lon'])
  
#         sorted_studios = sorted(
#             Studio.objects.all(),
#             key=lambda studio: (float(studio.location.split(',')[0]) - lat) ** 2 + (float(studio.location.split(',')[1]) - lon) ** 2
#         )
#         serializer = StudioSerializer(sorted_studios, many=True)
        
#         return Response(serializer.data)

class ListStudiosView(ListAPIView):
    permission_classes = (AllowAny,)    # can access the page without log in
    serializer_class = StudioSerializer
    # pagination_class = SmallResultsSetPagination
    
    def search_filter(self, kw, criterion):
        d = {
            'class name': 'name',
            'coach name': 'coach',
            'studio name': 'name',
            'amenity': 'name'
        }
        criterion_contain = d[criterion] + '__contains'    # which option (e.g coach name)
        
        if criterion == 'class name' or criterion == 'coach name':
            classes = BaseKlass.objects.filter(**{criterion_contain:kw})
            class_ids = []
            for c in classes:
                class_ids.append(c.studio.id)
            return Studio.objects.filter(id__in=class_ids)
            
        elif criterion == 'studio name':
            return Studio.objects.filter(**{criterion_contain:kw})
            
        else:
            studios = Amenity.objects.filter(**{criterion_contain:kw}).values('studio')
            studio_ids = []
            for s in studios:
                studio_ids.append(s['studio'])
            return Studio.objects.filter(id__in=studio_ids)

    def get_queryset(self):
        lat = Decimal(self.request.query_params.get('lat'))
        lon = Decimal(self.request.query_params.get('lon'))
        kw = self.request.query_params.get('keyword', None)   # what keyword
        criterion = self.request.query_params.get('criterion', None)    # which option (e.g coach name)
        
        if kw and criterion:
            # sets = filtered studios
            sets = self.search_filter(kw, criterion)
        else:   #sets = all studios
            sets = Studio.objects.all()
            
        return sorted(
            sets,
            key=lambda studio: (studio.latitude - lat) ** 2 + (studio.longitude - lon) ** 2
        )

class StudioView(RetrieveAPIView):
    permission_classes = (AllowAny,)    # can access the page without log in
    serializer_class = StudioSerializer

    def retrieve(self, request, *args, **kwargs):
        lat = request.GET.get('lat')
        lon = request.GET.get('lon')
        response = super().retrieve(request, args, kwargs)
        # reference to generate link google map url:
        # https://developers.google.com/maps/documentation/urls/get-started
        origin = f'{lat}%2C{lon}'
        dest = response.data["address"].replace(' ', '+').replace(',', '%2C')
        response.data["link"] = f'https://www.google.com/maps/dir/?api=1&origin={origin}&destination={dest}',
        return response

    def get_object(self):
        return get_object_or_404(
            Studio, 
            id=self.kwargs['studio_id']
            )
    
# class SearchStudiosView(ListAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = StudioSerializer

#     def get_queryset(self):
#         d = {
#             'class name': 'name',
#             'coach name': 'coach',
#             'studio name': 'name',
#             'amenity': 'name'
#         }
#         kw = self.request.query_params.get('keyword')   # what keyword
#         criterion = self.request.query_params.get('criterion')    # which option (e.g coach name)
#         criterion_contain = d[criterion] + '__contains'    # which option (e.g coach name)
        
#         if criterion == 'class name' or criterion == 'coach name':
#             classes = BaseKlass.objects.filter(**{criterion_contain:kw})
#             class_ids = []
#             for c in classes:
#                 class_ids.append(c.studio.id)
#             return Studio.objects.filter(id__in=class_ids)
            
#         elif criterion == 'studio name':
#             return Studio.objects.filter(**{criterion_contain:kw})
            
#         else:
#             studios = Amenity.objects.filter(**{criterion_contain:kw}).values('studio')
#             studio_ids = []
#             for s in studios:
#                 studio_ids.append(s['studio'])
#             return Studio.objects.filter(id__in=studio_ids)