from .serializers import PostSerializer
from .models import Post
from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from .models import Post, Like, Comment, Share
from .serializers import PostSerializer, LikeSerializer, CommentSerializer, ShareSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
import os
import json
from django.http import JsonResponse
from django.conf import settings
from .utils import search_by_country_state
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.exceptions import NotFound
import pycountry

import logging

logger = logging.getLogger(__name__)


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-timestamp')
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
    # Assuming you require authentication
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        logger.debug("Received POST request to PostListCreateView")
        logger.debug(f"User: {request.user}")
        logger.debug(f"Request data: {request.data}")
        logger.debug(f"Request FILES: {request.FILES}")
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        try:
            logger.debug("In perform_create method")
            serializer.save(author=self.request.user)
        except Exception as e:
            logger.error(f"Error saving serializer: {e}")
            raise  # Re-raise the caught exception


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_update(self, serializer):
        serializer.save()


class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])
        if Like.objects.filter(user=self.request.user, post=post).exists():
            raise ValidationError("You have already liked this post.")
        serializer.save(user=self.request.user, post=post)


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])
        serializer.save(user=self.request.user, post=post)


class ShareCreateView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])
        if Share.objects.filter(user=self.request.user, post=post).exists():
            raise ValidationError("You have already shared this post.")
        serializer.save(user=self.request.user, post=post)


class PostSearchView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        country = self.request.query_params.get('country')
        state = self.request.query_params.get('state')
        city = self.request.query_params.get('city')

        queryset = Post.objects.all()

        if country:
            queryset = queryset.filter(country__iexact=country)
        if state:
            queryset = queryset.filter(state__iexact=state)
        if city:
            queryset = queryset.filter(city__iexact=city)

        if not queryset.exists():
            raise NotFound('No posts found for the specified filters.')

        return queryset


class PostSearchByLocationView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()  # Always initialize queryset
        country = self.request.query_params.get('country')
        state = self.request.query_params.get('state')
        city = self.request.query_params.get('city')

        try:
            country_obj = pycountry.countries.get(name=country)
            if country_obj:  # Correct indentation
                country = country_obj.alpha_2  # Convert country to ISO code
        except LookupError:
            pass  # Keep country as it is if not found

        if country:
            queryset = queryset.filter(country__iexact=country)

        # Filter by state
        if state:
            queryset = queryset.filter(state__iexact=state)

        # Filter by city
        if city:
            queryset = queryset.filter(city__iexact=city)

        return queryset


def get_countries(request):
    try:
        # Construct the absolute path using BASE_DIR
        file_path = os.path.join(
            settings.BASE_DIR, 'countries_states_assets', 'countries.json')
        with open(file_path, 'r') as f:
            data = json.load(f)
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'Countries data not found'}, status=404)
