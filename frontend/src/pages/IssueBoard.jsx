
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { issueAPI } from "../api";
import IssueCard from "../components/IssueCard";
const IssueBoard = () => {
    const { projectId } = useParams();
    const [issues, setIssues] = useState([]);
    const [issueTitle, setIssueTitle] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const fetchIssues = async () => {
        try {
            const response = await issueAPI.get(`/api/issues/project/${projectId}`);
            setIssues(response.data);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
        }
    };
    const createIssue = async (e) => {
        e.preventDefault();
        if (!issueTitle) return;
        try {
            await issueAPI.post(`/api/issues/project/${projectId}`, { 
                title: issueTitle,
                description: issueDescription
            });
            setIssueTitle("");
            setIssueDescription("");
            fetchIssues(); // Manually refresh the list
        } catch (error) {
            console.error("Failed to create issue:", error);
        }
    };
    useEffect(() => {
        fetchIssues();
    }, [projectId]);
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Issue Board for Project {projectId}</h1>
                <form onSubmit={createIssue} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Create a New Issue</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={issueTitle}
                            onChange={(e) => setIssueTitle(e.target.value)}
                            placeholder="Issue Title"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                            placeholder="Issue Description"
                            rows="3"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Create Issue
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-1 gap-4">
                    {issues.length > 0 ? issues.map(issue => (
                        <IssueCard key={issue.id} issue={issue} />
                    )) : (
                        <p className="text-gray-500">No issues found. Create one above!</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default IssueBoard;

