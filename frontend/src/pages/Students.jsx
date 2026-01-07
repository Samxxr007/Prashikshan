import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await API.get("/student/all");
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return (
    <div className="p-12 text-center">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-500 font-medium">Scanning network for talent...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
          Talent Pool <span className="text-3xl">🎓</span>
        </h1>
        <p className="text-slate-400 font-medium">Discover and connect with top-performing students across disciplines.</p>
      </div>

      {students.length === 0 && (
        <div className="p-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800/50">
          <p className="text-slate-500 text-lg">No student identities found in the system.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s, i) => (
          <div key={i} className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 shadow-xl flex flex-col">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg overflow-hidden ring-4 ring-slate-800 group-hover:ring-blue-500/20 transition-all">
                {s.name?.charAt(0) || 'S'}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-bold text-xl text-white truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {s.name || 'Anonymous'}
                </h2>
                <p className="text-slate-500 text-xs font-medium truncate">{s.email}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Major</span>
                <span className="text-slate-200">{s.course || 'N/A'}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Array.isArray(s.skills) ? s.skills : (s.skills || '').split(',')).slice(0, 3).map((skill, si) => (
                  <span key={si} className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-[10px] font-bold border border-slate-700">
                    {skill.trim()}
                  </span>
                ))}
              </div>

              {s.bio && (
                <p className="text-slate-400 text-sm italic line-clamp-2 leading-relaxed opacity-70">
                  "{s.bio}"
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <Link
                to={`/industry/view/${s.email}`}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
