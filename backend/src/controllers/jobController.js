// backend/src/controllers/jobController.js

import Job from "../models/jobModel.js";        
import Application from "../models/Application.js"; 

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, company, role, location, salary, jobType, description } = req.body;

    const job = await Job.create({
      title,
      company,
      role,
      location,
      salary,
      jobType,
      description,
      postedBy: req.user.id, // 👈 recruiter ID
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error: error.message });
  }
};


// Get single job by ID
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only admin or the original poster can edit
    if (req.user.role !== "admin" && job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this job" });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a job
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // 🚫 Block recruiter/admin from applying
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Recruiters/Admins cannot apply to jobs" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const existingApp = await Application.findOne({ user: userId, job: job._id });
    if (existingApp)
      return res.status(400).json({ message: "You already applied to this job" });

    const application = new Application({ user: userId, job: job._id });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get jobs posted by logged-in recruiter
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
};
