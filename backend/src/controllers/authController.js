import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, studentProfiles, industryProfiles } from "../firebase.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Removed checkDbReady call to prevent production crashes

    const check = await users.doc(email).get();
    if (check.exists) return res.status(400).json({ msg: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    await users.doc(email).set({
      name,
      email,
      password: hash,
      role,
      createdAt: Date.now()
    });

    if (role === "student") {
      await studentProfiles.doc(email).set({
        name,
        email,
        skills: [],
        bio: "",
        course: "Not Specified",
        semester: "1",
        college: "Prashikshan Institute",
        status: "Active",
        createdAt: Date.now()
      });
    } else if (role === "industry") {
      await industryProfiles.doc(email).set({
        name,
        email,
        company: name,
        bio: "Company registration pending details...",
        location: "Remote",
        industry: "IT/Tech",
        rating: 4.5,
        internships: 0,
        createdAt: Date.now()
      });
    }

    res.json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Removed checkDbReady call to prevent production crashes

    const snap = await users.doc(email).get();
    if (!snap.exists) return res.status(400).json({ msg: "No user" });

    const user = snap.data();
    if (!user.password) {
      console.error("Login Error: User document missing password field for", email);
      return res.status(500).json({ error: "User account corrupted (missing password)" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong pass" });

    if (!process.env.JWT_SECRET) {
      console.error("Login Error: JWT_SECRET environment variable is not defined");
      return res.status(500).json({ error: "Server configuration error (missing secret)" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Login Internal Error:", err);
    res.status(500).json({ error: err.message });
  }
};
