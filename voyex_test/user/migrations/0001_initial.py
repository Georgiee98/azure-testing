# Generated by Django 4.2.16 on 2024-10-02 18:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import django_countries.fields
import timezone_field.fields
import user.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('user_type', models.CharField(choices=[('buyer', 'Buyer'), ('seller', 'Seller'), ('both', 'Buyer and Seller'), ('guest', 'Guest')], default='guest', max_length=10)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('time_zone', timezone_field.fields.TimeZoneField(default='UTC')),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=user.models.user_directory_path)),
                ('username', models.CharField(blank=True, max_length=50, unique=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('X', 'Other')], max_length=10)),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('street', models.CharField(blank=True, max_length=50)),
                ('street_number', models.CharField(blank=True, max_length=10)),
                ('zip', models.CharField(blank=True, max_length=50, null=True)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('about_me', models.TextField(blank=True)),
                ('social_media', models.CharField(blank=True, max_length=255)),
                ('experience', models.CharField(blank=True, max_length=255)),
                ('company', models.CharField(blank=True, max_length=100)),
                ('points', models.IntegerField(default=0)),
                ('user_level', models.CharField(blank=True, max_length=100)),
                ('contact', models.CharField(blank=True, max_length=50)),
                ('amount_of_posts', models.IntegerField(default=0)),
                ('amount_of_friends', models.IntegerField(default=0)),
                ('amount_following', models.IntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TravelPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('city', models.CharField(max_length=100)),
                ('radius', models.PositiveIntegerField(help_text='Radius in kilometers')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='travel_plans', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
