import { useState, useEffect } from "react";
import API from "../api";

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    course: "",
    semester: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/student/profile")
      .then((res) => {
        if (res.data) {
          setFormData({
            bio: res.data.bio || "",
            skills: (res.data.skills || []).join(", "),
            course: res.data.course || "",
            semester: res.data.semester || ""
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/student/profile", {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim())
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to save profile");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Edit Student Profile</h2>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Course</label>
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. B.Tech CSE"
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Semester</label>
          <input
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="e.g. 6"
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="w-full bg-gray-700 text-white p-3 rounded-lg h-32 outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Skills (comma separated)</label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, Python"
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
