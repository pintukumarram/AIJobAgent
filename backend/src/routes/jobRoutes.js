// jobRoutes
import express from "express";
import {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
} from "../controllers/jobController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
const router = express.Router();

// GET all jobs
router.get("/", getAllJobs);

// CREATE a job
router.post("/", authorizeRoles("recruiter", "admin"), createJob);

// GET job by ID
router.get("/:id", getJobById);

// UPDATE job
router.put("/:id", authorizeRoles("recruiter", "admin"), updateJob);

// DELETE job
router.delete("/:id", authorizeRoles("recruiter", "admin"), deleteJob);

// APPLY to a job
router.post("/:id/apply",protect, applyToJob);

export default router;
