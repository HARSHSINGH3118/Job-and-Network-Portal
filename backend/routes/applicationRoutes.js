// routes/applicationRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  applyToJob,
  getAppliedJobs,
} from "../controllers/applicationController.js";

const router = express.Router();

// POST /api/applications/apply
router.post(
  "/apply",
  protect,
  (req, res, next) => {
    console.log("➡️ /apply route hit");
    next();
  },
  applyToJob
);

// GET /api/applications/applied
router.get("/applied", protect, getAppliedJobs);

export default router;
