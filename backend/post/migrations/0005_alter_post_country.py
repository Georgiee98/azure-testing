# Generated by Django 4.2.16 on 2024-10-15 10:27

from django.db import migrations
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_alter_post_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='country',
            field=django_countries.fields.CountryField(blank=True, max_length=2, null=True),
        ),
    ]