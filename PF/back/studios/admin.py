from django.contrib import admin

# Register your models here.

from studios.models import *

# Register your models here.
class ImageInLine(admin.StackedInline):
    model = Image

class AmenityInLine(admin.TabularInline):
    model = Amenity
    fields = ["name", "quantity"]


class StudioAdmin(admin.ModelAdmin):
    model = Studio
    fields = ["name", "address", "latitude", "longitude", "postal_code", "phone_number"]
    inlines = [
        ImageInLine,
        AmenityInLine,
    ]
    list_display = ["name", "address", "latitude", "longitude", "postal_code", "phone_number"]
    
admin.site.register(Studio, StudioAdmin)