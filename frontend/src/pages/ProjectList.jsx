import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../api';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');

    const fetchProjects = async () => {
        try {
            const response = await projectAPI.get('/api/projects/');
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    const createProject = async (e) => {
        e.preventDefault();
        if (!projectName) return;
        try {
            await projectAPI.post('/api/projects/', { name: projectName });
            setProjectName('');
            fetchProjects();
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Projects</h1>
                
                <form onSubmit={createProject} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
                    <div className="flex">
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Project Name"
                            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg"
                        >
                            Create
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.length > 0 ? projects.map(project => (
                        <Link to={`/projects/${project.id}`} key={project.id} className="block">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className="text-gray-500">Owner ID: {project.owner_id}</p>
                            </div>
                        </Link>
                    )) : (
                        <p className="text-gray-500 md:col-span-2">No projects found. Create one above!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
