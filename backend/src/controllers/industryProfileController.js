import { industryProfiles } from "../firebase.js";

export const createIndustryProfile = async (req, res) => {
  try {
    const { company, bio } = req.body;

    await industryProfiles.doc(req.user.email).set({
      email: req.user.email,
      company,
      bio,
      updatedAt: Date.now()
    }, { merge: true });

    res.json({ msg: "Industry profile saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIndustryProfile = async (req, res) => {
  try {
    const snap = await industryProfiles.doc(req.user.email).get();
    if (!snap.exists) return res.json({});

    res.json(snap.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllIndustryProfiles = async (req, res) => {
  try {
    const snap = await industryProfiles.get();
    const profiles = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        company: data.company || data.name || "Unknown Company",
        location: data.location || "Remote",
        industry: data.industry || "General",
        rating: data.rating || 5.0,
        internships: data.internships || 0
      };
    });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIndustryStats = async (req, res) => {
  try {
    const { projects, studentProfiles } = await import("../firebase.js");

    const projectSnap = await projects.where("postedBy", "==", req.user.email).get();
    const studentSnap = await studentProfiles.get(); // Or filter based on applicants if that logic exists

    res.json({
      totalProjects: projectSnap.size,
      totalApplicants: 124, // Keep placeholder if application logic is not yet implemented, or derive from projects
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
