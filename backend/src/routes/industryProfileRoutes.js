import express from "express";
import { createIndustryProfile, getIndustryProfile, getAllIndustryProfiles } from "../controllers/industryProfileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIndustryProfile);
router.get("/", authMiddleware, getIndustryProfile);
router.get("/all", authMiddleware, getAllIndustryProfiles);

export default router;
