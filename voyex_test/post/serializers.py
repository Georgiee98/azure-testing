from rest_framework import serializers
from .models import Post, Like, Comment, Share
from django_countries.serializer_fields import CountryField as CountrySerializerField
from rest_framework.exceptions import NotFound

from rest_framework import serializers
from .models import Post, Like, Comment, Share
from django_countries.serializer_fields import CountryField as CountrySerializerField


class PostSerializer(serializers.ModelSerializer):
    # author = serializers.StringRelatedField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    image_url = serializers.SerializerMethodField(required=False)
    # Ensure image field is declared
    image = serializers.ImageField(required=False)
    country = CountrySerializerField(required=False, allow_null=True)
    likes_count = serializers.IntegerField(
        source='likes.count', read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    shares_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'title',
            'description',
            'image',        # Include the image field here
            'image_url',
            'country',
            'city',
            'timestamp',
            'likes_count',
            'comments_count',
            'shares_count',
        ]
        read_only_fields = [
            'id',
            'author',
            'timestamp',
            'likes_count',
            'comments_count',
            'shares_count',
        ]

    # def validate(self, data):
    #     if not data.get('country'):
    #         raise serializers.ValidationError(
    #             {"country": "Country is required."})
    #     if not data.get('state'):
    #         raise serializers.ValidationError({"state": "State is required."})
    #     if not data.get('city'):
    #         raise serializers.ValidationError({"city": "City is required."})
    #     return data

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        else:
            return None

    def create(self, validated_data):
        # Log validated data
        print('Validated data:', validated_data)
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'timestamp']
        read_only_fields = ['id', 'user', 'post', 'timestamp']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'timestamp']
        read_only_fields = ['id', 'user', 'post', 'timestamp']


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ['id', 'user', 'post', 'timestamp']
        read_only_fields = ['id', 'user', 'post', 'timestamp']
