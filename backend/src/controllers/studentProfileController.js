import { studentProfiles } from "../firebase.js";

export const saveProfile = async (req, res) => {
  try {
    const { course, semester, skills, bio } = req.body;

    await studentProfiles.doc(req.user.email).set({
      course,
      semester,
      skills,
      bio,
      updatedAt: Date.now(),
    }, { merge: true });

    return res.json({ msg: "Profile saved" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const snap = await studentProfiles.doc(req.user.email).get();
    if (!snap.exists) return res.json({}); // Return empty if not found so frontend can handle it

    return res.json(snap.data());
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProfileByEmail = async (req, res) => {
  try {
    const snap = await studentProfiles.doc(req.params.email).get();
    if (!snap.exists) return res.status(404).json({ msg: "Profile not found" });
    return res.json(snap.data());
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const snap = await studentProfiles.get();
    const students = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        name: data.name || doc.id.split('@')[0],
        college: data.college || "N/A",
        status: data.status || "Active"
      };
    });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
