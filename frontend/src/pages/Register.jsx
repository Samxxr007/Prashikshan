import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // 'student', 'industry'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMsg("");

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      setMsg("Identity Established! Redirecting to access portal...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const roleConfigs = {
    student: {
      color: "blue",
      gradient: "from-blue-600 to-indigo-700",
      accent: "text-blue-400",
      icon: "👨‍🎓",
      label: "Learner Registration"
    },
    industry: {
      color: "emerald",
      gradient: "from-emerald-600 to-teal-700",
      accent: "text-emerald-400",
      icon: "🏢",
      label: "Industry Registration"
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-slate-950 font-sans">
      {/* Abstract Background Elements */}
      <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 bg-${roleConfigs[role].color}-500`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-colors duration-700 bg-${role === 'student' ? 'indigo' : 'emerald'}-500`} />

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-8 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden relative">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              JOIN PRASHIKSHAN
            </h1>
            <p className={`text-xs uppercase tracking-[0.3em] font-bold ${roleConfigs[role].accent}`}>
              {roleConfigs[role].label}
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex p-1 bg-slate-950/50 rounded-2xl mb-8 border border-slate-800/30">
            {Object.keys(roleConfigs).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 capitalize flex items-center justify-center gap-2 ${role === r
                  ? `bg-slate-800 text-white shadow-xl border border-slate-700/50`
                  : "text-slate-500 hover:text-slate-300"
                  }`}
                aria-pressed={role === r}
              >
                <span className="text-base">{roleConfigs[r].icon}</span>
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium animate-shake">
              ⚠️ {error}
            </div>
          )}

          {msg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center">
              🎉 {msg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5 ml-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                required
                placeholder="Aarav Kumar"
                className="w-full px-5 py-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium placeholder:text-slate-700"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5 ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="aarav@example.in"
                className="w-full px-5 py-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium placeholder:text-slate-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5 ml-1" htmlFor="password">
                Secure Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium placeholder:text-slate-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 shadow-xl relative overflow-hidden group active:scale-[0.98] mt-4 ${loading ? "opacity-50 cursor-not-allowed" : `bg-gradient-to-br ${roleConfigs[role].gradient} hover:shadow-${roleConfigs[role].color}-500/20`
                }`}
            >
              <span className="relative z-10">
                {loading ? "Establishing Identity..." : "Create Account"}
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <p className="text-slate-400 text-sm">
              Already have an identity?{" "}
              <Link className={`${roleConfigs[role].accent} font-bold hover:underline`} to="/">
                Access Portal
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">v1.2.4-stable</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Encrypted Nodes</span>
        </div>
      </div>
    </div>
  );
}
