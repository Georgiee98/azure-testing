from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.contrib.auth import get_user_model



class CustomUserAdmin(UserAdmin):
    # Define the fields to be displayed in the list view
    list_display = (
        'id', 'email', 'username', 'first_name', 'last_name', 'gender', 'city', 'country',
        'phone', 'about_me', 'social_media', 'experience', 'company', 'points', 'user_level',
        'contact', 'amount_of_posts', 'amount_of_friends', 'amount_following', 'created', 'updated',
    )


    # Define the fields to be included in the form view
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': (
            'user_type', 'city', 'country', 'avatar', 'username', 'gender', 'first_name', 
            'last_name', 'street', 'street_number', 'zip', 'phone', 'about_me', 
            'social_media', 'experience', 'company', 'points', 'user_level', 'contact', 
            'amount_of_posts', 'amount_of_friends', 'amount_following'
        )}),
    )

    # Ensure the form fields are displayed properly in the admin form
    # form = CustomUserChangeForm  # You'll need to create this form if you want to customize the form fields


admin.site.register(CustomUser, CustomUserAdmin)