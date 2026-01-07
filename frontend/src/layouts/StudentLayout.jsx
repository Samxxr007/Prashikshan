import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'My Profile', path: '/student/view', icon: '👤' },
    { name: 'Gemini AI Hub', path: '/student/gemini', icon: '✨' },
    { name: 'Edit Profile', path: '/student/profile', icon: '⚙️' },
    { name: 'Recommendations', path: '/student/recommend', icon: '🎯' },
    { name: 'Explore Projects', path: '/projects', icon: '🚀' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            PRASHIKSHAN
          </h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.3em] font-bold">Learner Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800/50">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 border border-slate-700 hover:border-rose-500/20 transition-all text-sm font-bold"
          >
            <span>Logout</span>
            <span className="text-lg">🚪</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 relative min-h-screen overflow-x-hidden p-8">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />

        <Outlet />
      </main>
    </div>
  );
}
