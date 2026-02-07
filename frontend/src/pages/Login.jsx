import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // 'student', 'industry', 'admin'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mocked login logic for Admin or use real API
      if (role === 'admin' && email === 'admin@prashikshan.com' && password === 'admin123') {
        setTimeout(() => {
          navigate("/admin");
          setLoading(false);
        }, 1000);
        return;
      }

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Role check validation
      if (role !== res.data.role) {
        throw new Error(`This account is not registered as a ${role}.`);
      }

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "student") navigate("/dashboard");
      else if (res.data.role === "industry") navigate("/industry/dashboard");
      else if (res.data.role === "admin") navigate("/admin");

    } catch (err) {
      console.error("Login Error Details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });

      let errorMessage = "Invalid Credentials ❌";

      if (err.response) {
        // Server responded with a status code usually 4xx or 5xx
        errorMessage = err.response.data?.msg || err.response.data?.error || `Server Error: ${err.response.status}`;
        if (err.response.status >= 500) {
          errorMessage = "Server experienced an internal error. Please try again later.";
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = "Network Error: Unable to reach the server. Please check your connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = err.message;
      }

      setError(errorMessage);
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
      label: "Learner Gateway"
    },
    industry: {
      color: "emerald",
      gradient: "from-emerald-600 to-teal-700",
      accent: "text-emerald-400",
      icon: "🏢",
      label: "Industry Portal"
    },
    admin: {
      color: "indigo",
      gradient: "from-indigo-600 to-purple-700",
      accent: "text-indigo-400",
      icon: "⚙️",
      label: "Admin Control"
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-slate-950 font-sans">
      {/* Abstract Background Elements */}
      <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 bg-${roleConfigs[role].color}-500`} />
      <div className={`absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-colors duration-700 bg-${role === 'student' ? 'indigo' : role === 'industry' ? 'blue' : 'emerald'}-500`} />

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-8 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden relative">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              PRASHIKSHAN
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
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium flex items-center gap-3 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium placeholder:text-slate-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group relative">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1" htmlFor="password">
                  Security Pass
                </label>
                <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-blue-500 hover:text-blue-400 transition-colors">
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium placeholder:text-slate-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 shadow-xl relative overflow-hidden group active:scale-[0.98] ${loading ? "opacity-50 cursor-not-allowed" : `bg-gradient-to-br ${roleConfigs[role].gradient} hover:shadow-${roleConfigs[role].color}-500/20`
                }`}
            >
              <span className="relative z-10">
                {loading ? "Verifying Keys..." : "Authenticate Access"}
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              New to the platform?{" "}
              <Link className={`${roleConfigs[role].accent} font-bold hover:underline`} to="/register">
                Establish Identity
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">v1.2.4-stable</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Secure AES-256</span>
        </div>
      </div>
    </div>
  );
}
