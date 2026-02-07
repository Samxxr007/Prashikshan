import express from "express";
import cors from "cors";

// import routes
import authRoutes from "./routes/authRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import industryProfileRoutes from "./routes/industryProfileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentProfileRoutes);
app.use("/api/industry/profile", industryProfileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// Temporary seeding route
app.get("/api/seed", async (req, res) => {
    try {
        const { fileURLToPath } = await import("url");
        const path = await import("path");
        const { fork } = await import("child_process");

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const seedPath = path.join(__dirname, "seed.js");

        // Run seed.js in a separate process
        const child = fork(seedPath);

        child.on('close', (code) => {
            if (code === 0) {
                res.json({ msg: "Seeding completed successfully" });
            } else {
                res.status(500).json({ error: `Seeding failed with code ${code}` });
            }
        });

        child.on('error', (err) => {
            res.status(500).json({ error: `Seeding process error: ${err.message}` });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// default route
app.get("/", (req, res) => res.send("API Running"));

export default app;
