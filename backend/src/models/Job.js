// backend/src/models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    salary: String,
    type: {
      type: String,
      enum: ["Full-time", "Remote", "Internship"],
      default: "Full-time",
    },
    link: String,
    status: {
      type: String,
      enum: ["Scraped", "Applied", "Interview", "Pending", "Rejected"],
      default: "Scraped",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
