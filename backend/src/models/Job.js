import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    salary: String,
    description: String, // ✅ Added for job details page
    requirements: String, // ✅ Added for job details page
    responsibilities: String, // ✅ Added for job details page
    type: {
      type: String,
      enum: ["Full-time", "Remote", "Internship", "Part-time", "Contract"],
      default: "Full-time",
    },
    link: String,
    status: {
      type: String,
      enum: ["Scraped", "Applied", "Interview", "Pending", "Rejected", "Open"],
      default: "Scraped",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ Make it required so every job has an owner
    },
    appliedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // ✅ Track who applied to this job
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
