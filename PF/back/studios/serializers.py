from rest_framework import serializers

from studios.models import *

class ImageStudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["name", "quantity"]

class StudioSerializer(serializers.ModelSerializer):
    images = ImageStudioSerializer(many=True)
    amenities = AmenitySerializer(many=True)
    class Meta:
        model = Studio
        fields = [
            "id",
            "name", 
            "address", 
            "latitude", 
            "longitude", 
            "postal_code", 
            "phone_number",
            "images",
            "amenities"
            ]