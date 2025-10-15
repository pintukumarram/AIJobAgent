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

// Create new job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
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
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    next(error);
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
    const { id } = req.params;
    const userId = req.user?.id; // Assumes JWT middleware sets req.user

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApp = await Application.findOne({ user: userId, job: id });
    if (existingApp) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    const application = new Application({
      user: userId,
      job: id,
      status: "Applied",
    });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
