import React from 'react';
import { adminStats } from '../adminData';

const AdminReports = () => {
    const reports = [
        { title: 'Placement Progress', trend: '+15.4%', percentage: 72, color: 'bg-emerald-500' },
        { title: 'Industry Engagement', trend: '+5.2%', percentage: 88, color: 'bg-blue-500' },
        { title: 'Student Skill Index', trend: '+12.1%', percentage: 64, color: 'bg-indigo-500' },
        { title: 'Project Completion', trend: '-2.4%', percentage: 45, color: 'bg-rose-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-2xl font-bold">Analytics & Reports</h2>
                <p className="text-sm text-slate-400">Quarterly performance analysis and placement tracking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reports.map(report => (
                    <div key={report.title} className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-slate-300">{report.title}</h3>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${report.trend.startsWith('+') ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                                {report.trend}
                            </span>
                        </div>

                        <div className="flex items-end gap-4 mb-2">
                            <span className="text-5xl font-bold font-mono tracking-tighter">{report.percentage}%</span>
                            <span className="text-slate-500 text-sm mb-2 uppercase font-bold tracking-widest">Efficiency</span>
                        </div>

                        <div className="w-full h-3 bg-slate-900 rounded-full mt-4 overflow-hidden border border-slate-700/50">
                            <div
                                className={`h-full ${report.color} shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-1000 ease-out`}
                                style={{ width: `${report.percentage}%` }}
                            />
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-700 pt-6">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Target</p>
                                <p className="text-md font-bold">90%</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Average</p>
                                <p className="text-md font-bold">68%</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Peak</p>
                                <p className="text-md font-bold">94%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/20 border border-slate-700/30 border-dashed text-center">
                <p className="text-slate-500 italic">Advanced graphical charts (Canvas/SVG) would be integrated here for production.</p>
                <button className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold border border-slate-700 transition-all">
                    Export Full PDF Report
                </button>
            </div>
        </div>
    );
};

export default AdminReports;
