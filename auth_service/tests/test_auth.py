
import pytest
from app import create_app
from models import db, User
from config import Config

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"

@pytest.fixture
def app():
    app = create_app(TestingConfig)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_register_user(client):
    response = client.post("/api/auth/register", json={
        "username": "testuser",
        "password": "password123"
    })
    assert response.status_code == 201
    user = User.query.filter_by(username="testuser").first()
    assert user is not None

