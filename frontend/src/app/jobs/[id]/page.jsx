"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../utils/api";
import { Briefcase, MapPin, Calendar, IndianRupee, Clock } from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [params.id]);

  const fetchJobDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await apiRequest(`/jobs/${params.id}`, "GET", null, token);
      setJob(data);
      setApplied(data.status === "Applied");
    } catch (error) {
      console.error("Error fetching job details:", error);
      alert("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to apply for jobs");
        router.push("/login");
        return;
      }

      await apiRequest(`/jobs/${params.id}/apply`, "POST", {}, token);
      setApplied(true);
      alert("✅ Application submitted successfully!");
    } catch (error) {
      alert(error.message || "❌ Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The job you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600">{job.company}</p>
            </div>

            <span
              className={`px-4 py-2 text-sm rounded-full font-medium ${
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

          {/* Job Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={20} className="text-blue-600" />
              <span>{job.location || "Not specified"}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase size={20} className="text-blue-600" />
              <span>{job.jobType || "Full-time"}</span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-2 text-gray-600">
                <IndianRupee size={20} className="text-blue-600" />
                <span>{job.salary}</span>
              </div>
            )}

            {job.dateApplied && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} className="text-blue-600" />
                <span>Applied: {job.dateApplied}</span>
              </div>
            )}

            {job.postedDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={20} className="text-blue-600" />
                <span>Posted: {job.postedDate}</span>
              </div>
            )}
          </div>

          {/* Apply Button */}
          {!applied && (
            <button
              onClick={handleApply}
              disabled={applying}
              className="mt-6 w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg"
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>
          )}
        </div>

        {/* Job Description Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Job Description
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description || "No description available."}
          </div>
        </div>

        {/* Requirements Card */}
        {job.requirements && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Requirements
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </div>
          </div>
        )}

        {/* Responsibilities Card */}
        {job.responsibilities && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Responsibilities
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.responsibilities}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
