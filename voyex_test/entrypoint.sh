#!/bin/bash
# entrypoint.sh

# # Exit on error
set -e

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
exec gunicorn voyex_22.wsgi:application --bind 0.0.0.0:8000



# # Wait for the database to be ready
# until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
#     >&2 echo "Postgres is unavailable - sleeping"
#     sleep 1
# done

# >&2 echo "Postgres is up - continuing..."


# Wait for the database to be ready
# echo "Waiting for database..."
# while ! nc -z db 5433; do
#   sleep 0.1
# done
# echo "Database is up"

# # Run Django migrations
# echo "Applying migrations..."
# python manage.py makemigrations
# python manage.py migrate

# # Run any additional setup commands here
# echo "Collecting static files..."
# python manage.py collectstatic --noinput
# echo "Migrations and Collections Done"

# # Start the Gunicorn server
# echo "Starting Gunicorn server..."
# exec gunicorn voyex_22.wsgi:application --bind 0.0.0.0:8000
