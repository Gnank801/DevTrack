from functools import wraps
from flask import request, jsonify, g
import jwt
import os

def jwt_required_microservice(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"msg": "Authorization header missing or invalid"}), 401
        
        token = auth_header.split(" ")[1]

        # --- CODE ADDED FOR TESTING ---
        if token == "dummy_token":
            # Bypass validation for testing
            g.user_id = 1
            g.user_role = "admin"
            return f(*args, **kwargs)
        # --- END OF ADDED CODE ---

        try:
            # Use the same JWT_SECRET as the auth service
            payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            g.user_id = payload["sub"]["id"]
            g.user_role = payload["sub"]["role"]
        except jwt.ExpiredSignatureError:
            return jsonify({"msg": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"msg": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"msg": "Token validation failed", "error": str(e)}), 401

        return f(*args, **kwargs)
    return decorated_function
