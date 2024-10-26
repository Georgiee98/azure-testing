from django_countries.serializer_fields import CountryField as CountrySerializerField
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from zoneinfo import ZoneInfo

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password], style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={
                                      'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "A user with that email already exists."})

        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "A user with that email already exists."})

        # # Check if username is already in use
        # if User.objects.filter(username=attrs['username']).exists():
        #     raise serializers.ValidationError(
        #         {"username": "A user with that username already exists."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2', None)
        user = User.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Use email for authentication

    def validate(self, attrs):
        # Overriding the validate method to customize error messages
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        user = authenticate(**credentials)

        if user:
            if not user.is_active:
                raise serializers.ValidationError(
                    {'non_field_errors': ['User account is disabled.']}
                )

            data = super().validate(attrs)
            data['email'] = user.email
            data['username'] = user.username
            return data
        else:
            raise serializers.ValidationError(
                {'non_field_errors': ['Invalid email or password.']}
            )
# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         # Use email instead of username for authentication
#         email = attrs.get('email')
#         password = attrs.get('password')

#         user = authenticate(request=self.context.get(
#             'request'), email=email, password=password)

#         if not user:
#             raise AuthenticationFailed(
#                 'No active account found with the given credentials')

#         # If authentication succeeds, call the parent method to get the token
#         data = super().validate(attrs)
#         return data


class UserSerializer(serializers.ModelSerializer):
    time_zone = serializers.SerializerMethodField()
    country = CountrySerializerField()  # Use django-countries' serializer field

    class Meta:
        model = User
        fields = '__all__'

    def get_time_zone(self, obj):
        if isinstance(obj.time_zone, ZoneInfo):
            return str(obj.time_zone)  # Convert ZoneInfo to string
        return obj.time_zone


# starting from scratch
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
