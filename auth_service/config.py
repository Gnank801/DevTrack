import os
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or (
        f"postgresql://{os.getenv('POSTGRES_USER', 'devtrack')}:{os.getenv('POSTGRES_PASSWORD', 'devtrack')}@"
        f"{os.getenv('POSTGRES_HOST', 'postgres')}:5432/{os.getenv('POSTGRES_DB', 'devtrack')}"
    )
    JWT_SECRET_KEY = os.getenv("JWT_SECRET")
    SQLALCHEMY_TRACK_MODIFICATIONS = False