from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Replace with the correct registration URL
        self.url = reverse('register')

    def test_register_user(self):
        data = {
            "username": "John Smith",
            "email": "example.com",
            "password": "qweasdzxc",
            "password2": "qweasdzxc",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="example.com").exists())

    def test_password_mismatch(self):
        data = {
            "username": "John Smith",
            "email": "example.com",
            "password": "qweasdzxc",
            "password2": "differentpassword",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class RegistrationTestCase(APITestCase):
    def test_registration(self):
        url = reverse('register')
        data = {
            'username': 'johnsmith',
            'email': 'example@example.com',
            'password': 'qweasdzxc123',
            'password2': 'qweasdzxc123',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Verify that the user was created
        self.assertTrue(User.objects.filter(
            email='example@example.com').exists())

    def test_passwords_do_not_match(self):
        url = reverse('register')
        data = {
            'username': 'johnsmith',
            'email': 'example@example.com',
            'password': 'password123',
            'password2': 'differentpassword',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    def test_missing_fields(self):
        url = reverse('register')
        data = {
            'email': 'example@example.com',
            # Missing 'username' and 'password' fields
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)
        self.assertIn('password', response.data)
