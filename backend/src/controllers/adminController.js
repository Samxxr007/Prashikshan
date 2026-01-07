import { studentProfiles, industryProfiles, projects, users } from "../firebase.js";

export const getAdminStats = async (req, res) => {
    try {
        const studentSnap = await studentProfiles.get();
        const industrySnap = await industryProfiles.get();
        const projectSnap = await projects.get();
        const pendingSnap = await users.where("role", "==", "student").get(); // Example: filter by something pending if status exists

        res.json({
            totalStudents: studentSnap.size,
            totalCompanies: industrySnap.size,
            totalProjects: projectSnap.size,
            pendingApprovals: 0, // Logic for pending can be added later
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
