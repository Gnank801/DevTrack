from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["devtrack"]
events_collection = db["events"]

@app.post("/api/analytics/event")
def log_event():
    data = request.get_json()
    data["timestamp"] = datetime.utcnow()
    events_collection.insert_one(data)
    return jsonify({"msg": "Event logged"}), 201

@app.get("/api/analytics/summary")
def get_summary():
    pipeline = [
        {"$group": {
            "_id": {
                "event_type": "$event_type",
                "date": {"$dateToString": {"format": "%Y-%m-%d", "date": "$timestamp"}}
            },
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id.date": 1, "count": -1}}
    ]
    summary = list(events_collection.aggregate(pipeline))
    return jsonify(summary)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004)
