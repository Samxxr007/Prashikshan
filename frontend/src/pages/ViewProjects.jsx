import { useState, useEffect } from "react";
import API from "../api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/projects")
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-400">Available Projects</h2>

      {loading && <p className="text-gray-400">Loading opportunities...</p>}

      {!loading && projects.length === 0 && (
        <p className="text-gray-400">No active projects found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(p.requiredSkills || []).map((skill, i) => (
                <span key={i} className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>

            <div className="text-xs text-gray-500 mt-4">
              Posted by: <span className="text-gray-400">{p.postedBy || "Industry Partner"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
