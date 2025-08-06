import pytest
from app import create_app
from models import db, Issue, Comment
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

def test_create_issue(client):
    headers = { "Authorization": "Bearer dummy_token" }
    response = client.post("/api/issues/project/1", json={
        "title": "My First Test Issue",
        "description": "This is a test description."
    }, headers=headers)
    assert response.status_code == 201
    issue = Issue.query.filter_by(title="My First Test Issue").first()
    assert issue is not None
