import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    salary: { type: String },
    type: { type: String, enum: ["Full-time", "Remote", "Internship"] },
    status: {
      type: String,
      enum: ["Scraped", "Applied", "Interview", "Pending", "Rejected"],
      default: "Scraped",
    },
    link: { type: String },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
