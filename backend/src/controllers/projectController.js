import { projects } from "../firebase.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;

    await projects.add({
      title,
      description,
      requiredSkills,
      postedBy: req.user.email,
      createdAt: Date.now()
    });

    res.json({ msg: "Project posted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const snap = await projects.get();
    const list = snap.docs.map((doc) => doc.data());
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
