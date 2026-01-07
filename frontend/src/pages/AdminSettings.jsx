import React from 'react';

const AdminSettings = () => {
    const sections = [
        { title: 'Platform Configuration', desc: 'Main app settings and global variables', icon: '🛠️' },
        { title: 'User Permissions', desc: 'Manage access levels for staff and admins', icon: '🔐' },
        { title: 'Notification Engine', desc: 'Email and SMS alert preferences', icon: '📢' },
        { title: 'Security & Logs', desc: 'Audit trails and session management', icon: '🛡️' },
    ];

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-2xl font-bold">Admin Settings</h2>
                <p className="text-sm text-slate-400">Configure global parameters and security protocols</p>
            </div>

            <div className="space-y-4">
                {sections.map(section => (
                    <button key={section.title} className="w-full p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-700/40 hover:border-blue-500/30 transition-all flex items-center text-left group">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {section.icon}
                        </div>
                        <div className="ml-6 flex-1">
                            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{section.title}</h3>
                            <p className="text-slate-400 text-sm mt-1">{section.desc}</p>
                        </div>
                        <div className="text-slate-600 group-hover:text-blue-500 transition-colors">
                            →
                        </div>
                    </button>
                ))}
            </div>

            <div className="p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 mt-12">
                <h3 className="text-rose-400 font-bold mb-2">Danger Zone</h3>
                <p className="text-slate-500 text-sm mb-4">Actions here are irreversible and affect the entire production environment.</p>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl text-sm font-bold border border-rose-500/30 transition-all">
                        Reset All Data
                    </button>
                    <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-all">
                        Maintenance Mode
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
