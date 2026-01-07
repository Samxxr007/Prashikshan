import { studentProfiles, projects } from "../firebase.js";

export const getRecommendations = async (req, res) => {
  try {
    const snap = await studentProfiles.doc(req.user.email).get();
    if (!snap.exists) return res.json([]);

    const student = snap.data();
    const studentSkills = (student.skills || []).map(s => s.toLowerCase());

    const projSnap = await projects.get();
    const allProjects = projSnap.docs.map((d) => d.data());

    // Calculate score based on matching skills
    const recommendations = allProjects.map(project => {
      const required = (project.requiredSkills || []).map(s => s.toLowerCase());

      if (required.length === 0) return { project, score: 0 };

      const matchCount = required.filter(skill => studentSkills.includes(skill)).length;
      const score = (matchCount / required.length) * 100;

      return { project, score: Math.round(score) };
    });

    // Filter projects with non-zero score and sort by score descending
    const filtered = recommendations
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
