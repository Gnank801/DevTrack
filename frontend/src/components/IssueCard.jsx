
import React from "react";
import { Link } from "react-router-dom";

const IssueCard = ({ issue }) => {
    return (
        <Link to={`/issues/${issue.id}`} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
                <p className="text-gray-500 text-sm mb-2">Status: <span className="font-medium text-blue-700">{issue.status}</span></p>
                <p className="text-gray-500 text-sm mb-2">Priority: <span className="font-medium text-red-500">{issue.priority}</span></p>
                <p className="text-gray-700 truncate">{issue.description}</p>
            </div>
        </Link>
    );
};

export default IssueCard;

