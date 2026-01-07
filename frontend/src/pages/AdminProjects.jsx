import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await API.get('/projects');
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p =>
        (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.company || p.postedBy || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-slate-400">Loading projects...</div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Project Management</h2>
                    <p className="text-sm text-slate-400">Moderating and monitoring all active internship projects</p>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-blue-500 outline-none w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        Create Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length === 0 && <p className="text-slate-500 col-span-3 text-center p-12">No projects found.</p>}
                {filteredProjects.map((project, idx) => (
                    <div key={project.id || idx} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${project.status === 'Closed' ? 'bg-slate-700 text-slate-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                {project.status || 'Active'}
                            </span>
                            <span className="text-xs text-slate-500 italic">
                                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]">{project.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{project.company || project.postedBy}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {(project.requiredSkills || []).slice(0, 3).map((s, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Applicants</span>
                                <span className="text-xl font-mono font-bold text-blue-300">{project.applicants || 0}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-all">⚙️</button>
                                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-rose-600/20 hover:text-rose-400 transition-all">🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProjects;
