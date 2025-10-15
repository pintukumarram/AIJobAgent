"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { apiRequest } from "../utils/api"; // ✅ Use your existing shared apiRequest utility

export default function JobCard({ job }) {
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
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 flex flex-col gap-3 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-gray-500">{job.company}</p>
        </div>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            applied
              ? "bg-blue-100 text-blue-600"
              : job.status === "Interview"
              ? "bg-yellow-100 text-yellow-700"
              : job.status === "Offered"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {applied ? "Applied" : job.status || "Open"}
        </span>
      </div>

      {/* Details */}
      <div className="flex items-center text-gray-600 gap-4 text-sm mt-2">
        <span className="flex items-center gap-1">
          <Briefcase size={16} /> {job.role || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={16} /> {job.location || "Remote"}
        </span>
        {job.dateApplied && (
          <span className="flex items-center gap-1">
            <Calendar size={16} /> {job.dateApplied}
          </span>
        )}
      </div>

      {/* Apply Button */}
      {!applied && (
        <button
          onClick={handleApply}
          disabled={applying}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {applying ? "Applying..." : "Apply"}
        </button>
      )}
    </div>
  );
}
