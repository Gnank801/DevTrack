
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { issueAPI } from "../api";

const IssueDetail = () => {
    const { issueId } = useParams();
    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // State for the edit form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("open");

    const fetchIssueAndComments = async () => {
        try {
            setLoading(true);
            const issueResponse = await issueAPI.get(`/api/issues/${issueId}`);
            const commentsResponse = await issueAPI.get(`/api/issues/${issueId}/comments`);
            
            setIssue(issueResponse.data);
            setComments(commentsResponse.data);

            // Pre-fill edit form state
            setTitle(issueResponse.data.title);
            setDescription(issueResponse.data.description);
            setStatus(issueResponse.data.status);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssueAndComments();
    }, [issueId]);

    const handleUpdateIssue = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { title, description, status };
            const response = await issueAPI.put(`/api/issues/${issueId}`, updatedData);
            setIssue(response.data);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Failed to update issue:", error);
            alert("Failed to update issue.");
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            await issueAPI.post(`/api/issues/${issueId}/comments`, { body: newComment });
            setNewComment("");
            fetchIssueAndComments(); // Refresh comments after adding a new one
        } catch (error) {
            console.error("Failed to add comment:", error);
            alert("Failed to add comment.");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!issue) return <div className="p-8">Issue not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link to={`/projects/${issue.project_id}`} className="text-blue-500 hover:underline">
                            &larr; Back to Project Board
                        </Link>
                        <button 
                            onClick={() => setIsEditing(!isEditing)} 
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
                        >
                            {isEditing ? "Cancel" : "Edit Issue"}
                        </button>
                    </div>

                    {!isEditing ? (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{issue.title}</h1>
                            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                                <span>Status: <span className="font-medium text-blue-700">{issue.status}</span></span>
                                <span>Priority: <span className="font-medium text-red-500">{issue.priority}</span></span>
                            </div>
                            <div className="prose max-w-none"><p>{issue.description}</p></div>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdateIssue}>
                            {/* Edit Form JSX */}
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" className="mt-1 block w-full p-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full p-2 border rounded-lg">
                                        <option value="open">Open</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
                    <form onSubmit={handleAddComment} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Add Comment</button>
                    </form>
                    <div className="space-y-4">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-gray-800">{comment.body}</p>
                                    <p className="text-xs text-gray-400 mt-2">Comment by User ID: {comment.author_id}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetail;

