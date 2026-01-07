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

// default route
app.get("/", (req, res) => res.send("API Running"));

export default app;
