
import os
class Config:
    # Prioritize DATABASE_URL from Render, fall back to old method for local dev
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or (
        f"postgresql://{os.getenv(POSTGRES_USER)}:{os.getenv(POSTGRES_PASSWORD)}@{os.getenv(POSTGRES_HOST, postgres)}:5432/{os.getenv(POSTGRES_DB)}"
    )
    JWT_SECRET_KEY = os.getenv("JWT_SECRET")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

