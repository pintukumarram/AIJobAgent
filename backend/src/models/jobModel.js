import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    role: String,
    location: String,
    salary: String,
    jobType: String,
    description: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 important
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
