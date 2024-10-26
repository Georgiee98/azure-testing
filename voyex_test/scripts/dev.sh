541feb986a451d3acd20f663
#!/bin/bash
source activate voyex_22

# Wait for the database to be ready
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "Waiting for Postgres at $DB_HOST:$DB_PORT..."
  sleep 2
done

# Apply migrations
python manage.py makemigrations --noinput
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8000
