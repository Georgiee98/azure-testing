import psycopg2
from psycopg2 import sql, OperationalError

# Define your connection details from the environment
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "postgres"
DB_PORT = 5433

def create_database():
    try:
        # Connect to PostgreSQL server
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        connection.autocommit = True
        cursor = connection.cursor()
        
        # Create a new database
        cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier('my_new_database')))
        
        print("Database created successfully!")
    except OperationalError as e:
        print(f"Error: {e}")
    finally:
        if connection:
            cursor.close()
            connection.close()

if __name__ == "__main__":
    create_database()
