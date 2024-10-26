from django.urls import path
from .views import RegisterView, LogoutView, CustomTokenObtainPairView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    # Registration
    path('register/', RegisterView.as_view(), name='register'),
    # JWT Login
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # Token Refresh

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserDetailView.as_view(), name='user_detail'),
]
