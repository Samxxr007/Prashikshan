import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = await API.get('/industry/profile/all');
                setCompanies(data);
            } catch (err) {
                console.error("Failed to fetch companies", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    if (loading) return <div className="text-center p-12 text-slate-400">Loading partner companies...</div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Partner Companies</h2>
                    <p className="text-sm text-slate-400">Managing industry partnerships and internship quotas</p>
                </div>
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                    Onboard Company
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {companies.length === 0 && <p className="text-slate-500 col-span-2 text-center p-12">No companies registered yet.</p>}
                {companies.map(company => (
                    <div key={company.id} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex gap-6 hover:border-indigo-500/30 transition-all group">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl shadow-xl border border-slate-700 group-hover:scale-105 transition-transform">
                            🏢
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold">{company.company || company.name || 'Unknown Company'}</h3>
                                <span className="text-amber-400 font-bold flex items-center gap-1">
                                    ⭐ {company.rating || 'N/A'}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm mt-1">{company.location || 'Remote'} • {company.industry || 'IT'}</p>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Total Internships</span>
                                    <span className="text-lg font-mono font-bold text-indigo-400">{company.internships || 0}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Contact Email</span>
                                    <span className="text-sm font-semibold truncate block">{company.email || company.hr || 'No contact'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCompanies;
