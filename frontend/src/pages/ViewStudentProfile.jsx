import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function ViewStudentProfile() {
  const { email: paramEmail } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  // If no paramEmail, we fetch the logged-in user's profile
  const fetchUrl = paramEmail ? `/student/p/${paramEmail}` : "/student/profile";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(fetchUrl);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [fetchUrl]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 animate-pulse">
      <div className="w-24 h-24 bg-slate-800 rounded-full mb-6" />
      <div className="h-4 w-48 bg-slate-800 rounded mb-2" />
      <div className="h-3 w-32 bg-slate-800 rounded" />
    </div>
  );

  if (!profile || Object.keys(profile).length === 0) return (
    <div className="max-w-2xl mx-auto mt-20 p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl">
      <div className="text-6xl mb-6">🕵️‍♂️</div>
      <h3 className="text-2xl font-bold text-white mb-2">Profile Not Found</h3>
      <p className="text-slate-500 mb-8">This student has not completed their public profile identity yet.</p>
      <Link to={paramEmail ? "/industry/students" : "/dashboard"} className="text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:text-blue-300 transition-colors">
        ← Back to Dashboard
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl shadow-2xl">
        {/* Banner Gradient */}
        <div className="h-48 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="px-10 pb-10 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 border-8 border-slate-950 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-500/20">
              {profile.name?.charAt(0) || profile.email?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-black tracking-tight text-white mb-1 uppercase italic">
                {profile.name || "Anonymous Learner"}
              </h1>
              <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">
                Verified Student Identity
              </p>
            </div>
            {!paramEmail && (
              <Link to="/student/profile" className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 mb-2">
                Edit My Profile
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <span>📖</span> Personal Bio
                </h3>
                <p className="text-slate-300 leading-relaxed italic">
                  {profile.bio ? `"${profile.bio}"` : "No bio provided. This student prefers to let their skills do the talking."}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <span>🛠️</span> Technical Arsenal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && (Array.isArray(profile.skills) ? profile.skills : profile.skills.split(',')).map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                      {skill.trim()}
                    </span>
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && <span className="text-slate-600 text-xs mt-2">Skills not specified yet.</span>}
                </div>
              </div>

              {/* Gemini AI Mastery Section */}
              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <span className="text-blue-500">✨</span> Gemini AI Mastery
                </h3>
                <div className="space-y-4">
                  {profile.masteredSkills && profile.masteredSkills.length > 0 ? (
                    profile.masteredSkills.map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                        <div>
                          <p className="text-sm font-bold text-white">{m.skill}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Verified on {new Date(m.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xl font-black text-blue-400">{m.score}/10</span>
                          <div className="h-1 w-20 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${(m.score / 10) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-600 italic px-2">No AI-verified masteries yet. Start a roadmap in the Gemini Hub!</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/50 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <span>🏛️</span> Academic Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Institution</p>
                    <p className="text-slate-200 font-medium">{profile.college || 'Prashikshan Institute'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Specialization</p>
                    <p className="text-slate-200 font-medium">{profile.course || 'General Engineering'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Semester</p>
                    <p className="text-slate-200 font-medium">{profile.semester || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xl shadow-indigo-600/20">
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">Contact Gateway</h3>
                <p className="font-bold text-sm mb-6 truncate">{profile.email}</p>
                <button className="w-full py-3 rounded-xl bg-white text-indigo-700 text-xs font-black uppercase tracking-tighter hover:bg-blue-50 transition-all">
                  Request Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
