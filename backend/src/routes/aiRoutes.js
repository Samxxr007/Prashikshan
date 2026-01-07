import express from "express";
import { generateRoadmap, generateQuiz, saveMastery, saveRoadmapProgress, getSavedRoadmap } from "../controllers/aiController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/roadmap", authMiddleware, generateRoadmap);
router.post("/test", authMiddleware, generateQuiz);
router.post("/save-mastery", authMiddleware, saveMastery);
router.post("/roadmap/save", authMiddleware, saveRoadmapProgress);
router.get("/roadmap/:skill", authMiddleware, getSavedRoadmap);

export default router;
