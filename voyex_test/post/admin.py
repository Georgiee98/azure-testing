from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'timestamp', 'country', 'city')
    search_fields = ('title', 'description', 'country', 'city')
    list_filter = ('country', 'timestamp')


# @admin.register(Location)
# class LocationAdmin(admin.ModelAdmin):
#     list_display = ('name', 'city', 'latitude', 'longitude', 'country')
#     search_fields = ('name', 'city', 'country')
