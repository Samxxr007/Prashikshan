import express from "express";
import { saveProfile, getProfile, getAllStudents, getProfileByEmail } from "../controllers/studentProfileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, saveProfile);
router.get("/profile", authMiddleware, getProfile);
router.get("/all", authMiddleware, getAllStudents);
router.get("/p/:email", authMiddleware, getProfileByEmail);

export default router;
