from django.contrib.auth import get_user_model
from datetime import date
import random
import string
from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models
from timezone_field import TimeZoneField
from django.utils import timezone
from django_countries.fields import CountryField
from django.core.exceptions import ValidationError


def default_start_time():
    return timezone.now()


def user_directory_path(instance, filename):
    return f'{instance.id}/{instance.username}/{filename}'


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('The Passwords field must be set.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not email:
            raise ValueError('Superusers must have an Email.')
        if not password:
            raise ValueError('Superusers must have a password.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    objects = CustomUserManager()
    USER_TYPE_CHOICES = (
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
        ('both', 'Buyer and Seller'),
        ('guest', 'Guest'),
    )
    user_type = models.CharField(
        max_length=10, choices=USER_TYPE_CHOICES, default='guest')

    email = models.EmailField(unique=True, max_length=255, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # For gender choice
    MALE = "M"
    FEMALE = "F"
    OTHER = "X"

    GENDER_CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female"),
        (OTHER, "Other"),
    ]

    # Additional fields can be added here
    # For example, future travel plans, current location, etc.
    time_zone = TimeZoneField(default='UTC')
    city = models.CharField(max_length=100, blank=True, null=True)
    # Correct the model field for country
    country = CountryField()


    # Consider using a library for country fields

    "Genreal Info"
    avatar = models.ImageField(
        null=True, blank=True, upload_to=user_directory_path)
    username = models.CharField(max_length=50, blank=True, unique=True)
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICES, blank=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=50, blank=True)
    street_number = models.CharField(max_length=10, blank=True)
    zip = models.CharField(max_length=50, blank=True, null=True)
    "Personal Info"
    phone = models.CharField(max_length=20, blank=True)
    about_me = models.TextField(blank=True)
    social_media = models.CharField(max_length=255, blank=True)
    experience = models.CharField(max_length=255, blank=True)
    company = models.CharField(max_length=100, blank=True)
    points = models.IntegerField(default=0)
    user_level = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=50, blank=True)
    amount_of_posts = models.IntegerField(default=0)
    amount_of_friends = models.IntegerField(default=0)
    amount_following = models.IntegerField(default=0)
    # friends = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name="my_friends", blank=True)
    # following = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='followers', blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} {self.email}"


User = get_user_model()


class TravelPlan(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='travel_plans')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='travel_plans')
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    # Correct the model field for country
    country = CountryField()

    city = models.CharField(max_length=100)
    radius = models.PositiveIntegerField(help_text='Radius in kilometers')
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.city}, {self.country}"

    def is_active(self):
        today = date.today()
        return self.start_date <= today <= self.end_date

    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError('End date cannot be before start date.')
