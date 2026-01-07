import { useState } from "react";
import API from "../api";

export default function PostProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/projects", {
        title: formData.title,
        description: formData.description,
        requiredSkills: formData.requiredSkills.split(",").map(s => s.trim())
      });
      alert("Project Posted Successfully!");
      setFormData({ title: "", description: "", requiredSkills: "" });
    } catch (err) {
      alert("Failed to post project");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-green-400">Post a Project / Internship</h2>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2 font-medium">Project Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. AI Research Intern"
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role and responsibilities..."
            className="w-full bg-gray-700 text-white p-3 rounded-lg h-40 outline-none focus:ring-2 ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 font-medium">Required Skills (comma-separated)</label>
          <input
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="Python, TensorFlow, Data Analysis"
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-[1.01]"
        >
          {loading ? "Posting..." : "Post Project"}
        </button>
      </form>
    </div>
  );
}
