// jobRoutes
import express from "express";
import {
  getAllJobs,
  getMyJobs,
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
router.post("/", protect,authorizeRoles("recruiter", "admin"), createJob);

router.get("/my-jobs", protect, authorizeRoles("recruiter", "admin"), getMyJobs);

// GET job by ID
router.get("/:id", getJobById);

// UPDATE job
router.put("/:id", protect, updateJob);

// DELETE job
router.delete("/:id", authorizeRoles("recruiter", "admin"), deleteJob);

// APPLY to a job
router.post("/:id/apply",protect, applyToJob);

// router.get("/my-jobs", protect, authorizeRoles("recruiter"), getRecruiterJobs);

export default router;
