
from flask import Blueprint, request, jsonify, g
from models import db, Project, ProjectUser
from auth_middleware import jwt_required_microservice
import requests
import os

bp = Blueprint("project", __name__, url_prefix="/api/projects")

ANALYTICS_URL = "http://analytics_service:5004/api/analytics/event"

def log_analytics(event_type, payload):
    """Helper function to send an event to the analytics service."""
    try:
        # Add the user_id from the request context to the payload
        full_payload = {
            "event_type": event_type,
            "user_id": g.user_id,
            **payload
        }
        requests.post(ANALYTICS_URL, json=full_payload)
        print(f"--> [PROJECT SERVICE] Logged analytics event: {event_type}", flush=True)
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to log analytics event: {e}", flush=True)

@bp.get("/")
@jwt_required_microservice
def list_projects():
    projects = Project.query.all()
    return jsonify([{"id": p.id, "name": p.name, "owner_id": p.owner_id} for p in projects])

@bp.post("/")
@jwt_required_microservice
def create_project():
    data = request.get_json()
    project = Project(name=data["name"], owner_id=g.user_id)
    db.session.add(project)
    db.session.commit()
    
    project_user = ProjectUser(project_id=project.id, user_id=g.user_id, role="admin")
    db.session.add(project_user)
    db.session.commit()

    # Log the event after the project is successfully created
    log_analytics("project_created", {"project_id": project.id, "project_name": project.name})
    
    return jsonify({"id": project.id, "name": project.name}), 201

