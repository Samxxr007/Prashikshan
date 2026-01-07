import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Students', path: '/admin/students', icon: '👨‍🎓' },
        { name: 'Projects', path: '/admin/projects', icon: '📁' },
        { name: 'Companies', path: '/admin/companies', icon: '🏢' },
        { name: 'Reports', path: '/admin/reports', icon: '📈' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans selection:bg-blue-500/30">
            {/* Sidebar */}
            <aside
                className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col fixed h-full z-20"
                aria-label="Admin Navigation"
            >
                <div className="p-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Prashikshan Admin
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold font-mono">Control Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10'
                                        : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
                                    }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto border-t border-slate-700/50">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Admin User</p>
                            <p className="text-xs text-slate-400">Master Access</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 relative min-h-screen overflow-x-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animae-pulse" />
                <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />

                <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 -ml-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors md:hidden"
                            aria-label="Toggle Sidebar"
                        >
                            ☰
                        </button>
                        <h2 className="text-xl font-semibold">
                            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Notifications">
                            🔔
                        </button>
                        <Link to="/" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition-all">
                            Exit to App
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
