
import pytest
from app import create_app
from models import db, Project
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

def test_create_project(client):
    headers = { "Authorization": "Bearer dummy_token" }
    response = client.post("/api/projects/", json={
        "name": "My New Test Project"
    }, headers=headers)
    assert response.status_code == 201
    project = Project.query.filter_by(name="My New Test Project").first()
    assert project is not None

