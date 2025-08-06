from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User

bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@bp.post("/register")
def register():
    data = request.get_json()
    if User.query.filter_by(username=data["username"]).first():
        return {"msg": "User exists"}, 409
    user = User(username=data["username"], role=data.get("role", "reporter"))
    user.set_password(data["password"])
    db.session.add(user); db.session.commit()
    return {"msg": "created"}, 201

@bp.post("/login")
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()
    if not user or not user.check_password(data["password"]):
        return {"msg": "bad creds"}, 401
    token = create_access_token(identity={"id": user.id, "role": user.role})
    return {"access_token": token}