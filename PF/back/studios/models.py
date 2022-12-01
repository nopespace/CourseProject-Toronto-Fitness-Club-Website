from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Studio(models.Model):
    name = models.CharField(unique=True, max_length=200)
    address = models.TextField(max_length=400)

    # validate geographical location
    latitude = models.DecimalField(max_digits=7, decimal_places=5)
    longitude = models.DecimalField(max_digits=7, decimal_places=5)
    # geo_regex = RegexValidator(regex=r'^[1-9][0-9].[0-9]{2}, -?[1-9][0-9].[0-9]{2}$', message="Please follow this example format: (xx.xx, xx.xx)")
    # location = models.CharField(validators=[geo_regex], max_length=13, help_text="latitude, longitude. e.g. 43.66, -79.39")

    # validate postal code
    postal_regex = RegexValidator(regex=r'^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$', message="Please follow this example format: M0S3C4")
    postal_code = models.CharField(validators=[postal_regex], max_length=6, help_text="e.g. M0S3C4")

    # validate phone number
    phone_regex = RegexValidator(regex=r'^[0-9]{3}-[0-9]{3}-[0-9]{4}$', message="Phone number must be entered in the format: 'xxx-xxx-xxxx'.")
    phone_number = models.CharField(validators=[phone_regex], max_length=12, help_text="e.g. 123-123-1234")
    
    def __str__(self):
        return f"Studio: {self.name}"

# Image For studio
class Image(models.Model):
    studio = models.ForeignKey(Studio, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='studio/', null=True, blank=True)

    def __str__(self):
        return f"Studio image"

# amenities for a studio
class Amenity(models.Model):
    name = models.CharField(verbose_name="type", max_length=200, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    studio = models.ForeignKey(Studio, related_name="amenities", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}: {self.quantity}"


# class CurrentLoc(models.Model):
#     lat = models.DecimalField(max_digits=8, decimal_places=5)
#     lon = models.DecimalField(max_digits=8, decimal_places=5)

#     def __str__(self):
#         return f"{self.lat}: {self.lon}"