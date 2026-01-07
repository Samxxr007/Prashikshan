import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [statsData, setStatsData] = useState({
        totalStudents: 0,
        totalProjects: 0,
        totalCompanies: 0,
        pendingApprovals: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, statsRes] = await Promise.all([
                    API.get('/student/all'),
                    API.get('/admin/stats')
                ]);
                setStudents(studentsRes.data);
                setStatsData(statsRes.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'Total Students', value: statsData.totalStudents, icon: '👨‍🎓', color: 'from-blue-500 to-indigo-600' },
        { label: 'Active Projects', value: statsData.totalProjects, icon: '📁', color: 'from-emerald-500 to-teal-600' },
        { label: 'Partner Companies', value: statsData.totalCompanies, icon: '🏢', color: 'from-amber-500 to-orange-600' },
        { label: 'Pending Approvals', value: statsData.pendingApprovals, icon: '⏳', color: 'from-rose-500 to-pink-600' },
    ];

    const filteredStudents = students.filter(s =>
        (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.college || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 hover:translate-y-[-4px]"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-3xl font-bold mt-2 font-mono tracking-tight">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg shadow-slate-900/50`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs">
                            <span className="text-emerald-400 font-bold">↑ 12%</span>
                            <span className="text-slate-500">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Panel / Data Table */}
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold">Student Management</h3>
                        <p className="text-sm text-slate-400">View and manage all registered students</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Search students"
                            />
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                            + Add New
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" aria-label="Students List">
                        <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">College</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="group hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{student.name}</div>
                                                <div className="text-xs text-slate-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{student.college}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            student.status === 'Placed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors" aria-label="Edit student">
                                                ✏️
                                            </button>
                                            <button
                                                className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"
                                                aria-label="Delete student"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No students found matching your search.</p>
                    </div>
                )}

                <div className="p-4 border-t border-slate-700/50 bg-slate-900/30 text-slate-500 text-xs flex justify-between items-center">
                    <span>Showing {filteredStudents.length} of {students.length} students</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-slate-700 opacity-50 cursor-not-allowed">Previous</button>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
