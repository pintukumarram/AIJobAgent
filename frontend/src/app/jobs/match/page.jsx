"use client";
import React, { useState } from "react";
import { apiRequest } from "../../../utils/api";
import JobCard from "../../../components/JobCard";
import toast from "react-hot-toast";

export default function MatchJobsPage() {
  const [resumeText, setResumeText] = useState("");
  const [matches, setMatches] = useState([]);

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!resumeText) return toast.error("Paste your resume text!");

    try {
      const res = await apiRequest("/ai/match-jobs", "POST", { resumeText });
      setMatches(res.matches);
      toast.success("✅ Matching complete!");
    } catch (err) {
      toast.error("❌ Failed to match jobs");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Find Matching Jobs</h1>
      <form onSubmit={handleMatch}>
        <textarea
          className="w-full border rounded p-2"
          rows="6"
          placeholder="Paste your resume text..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Find Matches</button>
      </form>

      <div className="mt-6 grid gap-4">
        {matches?.length > 0 &&
          matches.map((job, i) => <JobCard key={i} job={job} />)}
      </div>
    </div>
  );
}
