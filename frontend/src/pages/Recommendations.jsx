import { useState, useEffect } from "react";
import API from "../api";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/recommend")
      .then(res => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-purple-400">Recommended Opportunities</h2>

      {loading && <p className="text-gray-400">Finding matches based on your skills...</p>}

      {!loading && recommendations.length === 0 && (
        <div className="bg-gray-800 p-8 rounded-xl text-center">
          <p className="text-xl text-gray-300">No matches found yet.</p>
          <p className="text-gray-500 mt-2">Try adding more skills to your profile.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
              {item.score}% Match
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{item.project.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.project.requiredSkills?.slice(0, 3).map((skill, i) => (
                <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {item.project.requiredSkills?.length > 3 && (
                <span className="text-gray-500 text-xs py-1">+{item.project.requiredSkills.length - 3}</span>
              )}
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-semibold transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
