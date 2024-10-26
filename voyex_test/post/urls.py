from django.urls import path
from .views import PostListCreateView, PostRetrieveUpdateDestroyView, LikeCreateView, CommentCreateView, ShareCreateView, get_countries, PostSearchView, PostSearchByLocationView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:pk>/', PostRetrieveUpdateDestroyView.as_view(),
         name='post-detail'),
    path('<int:post_id>/like/', LikeCreateView.as_view(), name='post-like'),
    path('<int:post_id>/comment/',
         CommentCreateView.as_view(), name='post-comment'),
    path('<int:post_id>/share/',
         ShareCreateView.as_view(), name='post-share'),
    path('countries/', get_countries, name='get_countries'),
    path('search-by-location/', PostSearchByLocationView.as_view(),
         name='post_search_by_location'),
    path('search/', PostSearchView.as_view(), name='post_search'),
]
