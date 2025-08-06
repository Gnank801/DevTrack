
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes import bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    JWTManager(app)
    CORS(app)
    app.register_blueprint(bp)
    return app

app = create_app()
with app.app_context():
    db.create_all()

