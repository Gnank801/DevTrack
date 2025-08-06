from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import bp as issue_bp 

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)
    db.init_app(app)
    app.register_blueprint(issue_bp)
    return app

# This block is for running the app directly with Gunicorn
# It will be ignored by the pytest runner
app = create_app()
with app.app_context():
    db.create_all()