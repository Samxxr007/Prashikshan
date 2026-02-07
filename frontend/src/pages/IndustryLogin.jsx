import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function IndustryLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");

    try {
      const r = await API.post("/auth/login", { email, password });
      if (r.data.role !== "industry") return setErr("Not Industry User");
      localStorage.setItem("token", r.data.token);
      nav("/industry/dashboard");
    } catch (e) {
      setErr(e.response?.data?.error || "Invalid Login");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 w-[360px] rounded-xl">
        <h2 className="text-center text-2xl mb-4 text-blue-400">Industry Login</h2>

        {err && <p className="text-red-400 mb-2 text-center">{err}</p>}

        <form onSubmit={submit} className="space-y-3">
          <input className="w-full rounded-lg bg-gray-700 px-4 py-3" placeholder="Email"
            onChange={e => setEmail(e.target.value)} />
          <input className="w-full rounded-lg bg-gray-700 px-4 py-3" type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />

          <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg">
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Go back? <Link className="text-purple-400" to="/">Student Login</Link>
        </p>
      </div>
    </div>
  );
}
