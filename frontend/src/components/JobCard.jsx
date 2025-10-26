"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { apiRequest } from "../utils/api";
import { useAuth } from "../context/AuthContext"; // ✅ Import useAuth

export default function JobCard({ job }) {
  const { user } = useAuth(); // ✅ Get current user
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(job.status === "Applied");

  const handleApply = async () => {
    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to apply for jobs");
        return;
      }

      await apiRequest(`/jobs/${job._id}/apply`, "POST", {}, token);
      setApplied(true);
      alert("✅ Application submitted successfully!");
    } catch (error) {
      alert(error.message || "❌ Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
      {/* Header with Status Badge */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {job.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            applied
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
              : job.status === "Interview"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
              : job.status === "Offered"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {applied ? "Applied" : job.status || "Open"}
        </span>
      </div>

      {/* Location */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
        <MapPin size={16} />
        {job.location || "Not specified"}
      </p>

      {/* Description Preview */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
        {job.description?.substring(0, 120)}...
      </p>

      {/* Job Details */}
      <div className="flex items-center text-gray-600 dark:text-gray-400 gap-4 text-sm mb-4">
        {job.role && (
          <span className="flex items-center gap-1">
            <Briefcase size={16} /> {job.role}
          </span>
        )}
        {job.dateApplied && (
          <span className="flex items-center gap-1">
            <Calendar size={16} /> {job.dateApplied}
          </span>
        )}
      </div>

      {/* Footer: Job Type & Actions */}
      <div className="flex justify-between items-center gap-3">
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
          {job.type || job.jobType || "Full-time"}
        </span>

        <div className="flex gap-2">
          <Link
            href={`/jobs/${job._id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Apply Button - Only show for regular users (not recruiters) */}
      {user && user.role === "user" && !applied && (
        <button
          onClick={handleApply}
          disabled={applying}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>
      )}

      {/* Show "Already Applied" message for users who applied */}
      {user && user.role === "user" && applied && (
        <div className="mt-4 w-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg text-center font-medium">
          ✅ Already Applied
        </div>
      )}
    </div>
  );
}
