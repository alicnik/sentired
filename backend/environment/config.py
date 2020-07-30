import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/sentiredditdb')
secret = os.getenv('SECRET', 'we need to come up with a better secret')



