from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from django.contrib.auth import get_user_model
from django.utils import timezone
from math import radians, sin, cos, sqrt, atan2

User = get_user_model()

# Helper function to calculate distance between two points (haversine formula)


def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometers
    phi1 = radians(lat1)
    phi2 = radians(lat2)
    delta_phi = radians(lat2 - lat1)
    delta_lambda = radians(lon2 - lon1)

    a = sin(delta_phi / 2) ** 2 + cos(phi1) * \
        cos(phi2) * sin(delta_lambda / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c  # Distance in kilometers


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(null=True, blank=True, upload_to='posts/')

    timestamp = models.DateTimeField(auto_now_add=True)
    country = CountryField(blank=True, null=True)  # Stores country as ISO code
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.title

    def get_country_name(self):
        """Convert ISO code to full country name."""
        if self.country:
            try:
                country = pycountry.countries.get(alpha_2=self.country)
                return country.name
            except LookupError:
                return self.country  # Fallback if country code is unknown
        return None

    def calculate_distance(self, user_lat, user_lon):
        if self.latitude and self.longitude:
            return haversine(self.latitude, self.longitude, user_lat, user_lon)
        return None


class Like(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='likes')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=['user', 'post'], name='unique_like')]


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Share(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='shares')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='shares')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')
