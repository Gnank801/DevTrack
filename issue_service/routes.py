
from flask import Blueprint, request, jsonify, g
from models import db, Issue, Comment
from auth_middleware import jwt_required_microservice
bp = Blueprint("issue", __name__, url_prefix="/api/issues")

# === Issue Routes ===
@bp.get("/project/<int:project_id>")
@jwt_required_microservice
def list_issues(project_id):
    issues = Issue.query.filter_by(project_id=project_id).all()
    return jsonify([i.to_dict() for i in issues])

@bp.post("/project/<int:project_id>")
@jwt_required_microservice
def create_issue(project_id):
    data = request.get_json()
    new_issue = Issue(
        title=data["title"],
        description=data.get("description"),
        project_id=project_id,
        reporter_id=g.user_id,
    )
    db.session.add(new_issue)
    db.session.commit()
    return jsonify(new_issue.to_dict()), 201

@bp.get("/<int:issue_id>")
@jwt_required_microservice
def get_issue(issue_id):
    issue = Issue.query.get_or_404(issue_id)
    return jsonify(issue.to_dict())

@bp.put("/<int:issue_id>")
@jwt_required_microservice
def update_issue(issue_id):
    issue = Issue.query.get_or_404(issue_id)
    data = request.get_json()
    issue.title = data.get("title", issue.title)
    issue.description = data.get("description", issue.description)
    issue.status = data.get("status", issue.status)
    issue.assignee_id = data.get("assignee_id", issue.assignee_id)
    db.session.commit()
    return jsonify(issue.to_dict())

@bp.delete("/<int:issue_id>")
@jwt_required_microservice
def delete_issue(issue_id):
    issue = Issue.query.get_or_404(issue_id)
    db.session.delete(issue)
    db.session.commit()
    return jsonify({"message": "Issue deleted successfully"}), 200

# --- NEW: Comment Routes ---

@bp.get("/<int:issue_id>/comments")
@jwt_required_microservice
def get_comments(issue_id):
    """Returns all comments for a specific issue."""
    comments = Comment.query.filter_by(issue_id=issue_id).order_by(Comment.ts.asc()).all()
    return jsonify([c.to_dict() for c in comments])

@bp.post("/<int:issue_id>/comments")
@jwt_required_microservice
def add_comment(issue_id):
    """Adds a new comment to an issue."""
    data = request.get_json()
    if not data or not data.get("body"):
        return jsonify({"error": "Comment body is required"}), 400
    
    new_comment = Comment(
        issue_id=issue_id,
        author_id=g.user_id,
        body=data["body"]
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.to_dict()), 201

