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
