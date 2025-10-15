"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function NewJobPage() {
  const router = useRouter();
  const [job, setJob] = useState({
    title: "",
    company: "",
    role: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
  });

  const { user, loading } = useAuth();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Show loading while auth info is loading
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        ⏳ Checking authorization...
      </div>
    );
  }

  // Show if not logged in
  if (!user) {
    return (
      <div className="text-center text-red-600 mt-20 text-lg">
        ⚠️ Please log in to access this page.
      </div>
    );
  }

  // Show if logged in but unauthorized role
  if (user?.role !== "recruiter" && user?.role !== "admin") {
    return (
      <div className="text-center text-red-600 mt-20 text-lg">
        ❌ You are not authorized to post jobs.
      </div>
    );
  }

  // Handlers
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const token = localStorage.getItem("token");
      await apiRequest("/jobs", "POST", job, token);
      toast.success("✅ Job created successfully!");
      router.push("/jobs");
    } catch (error) {
      toast.error(error.message || "Failed to post job");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Render form on authorized user
  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🧾 Post a New Job
        </h1>

        {[
          { label: "Job Title", name: "title" },
          { label: "Company", name: "company" },
          { label: "Role", name: "role" },
          { label: "Location", name: "location" },
          { label: "Salary Range", name: "salary" },
          { label: "Job Type (Full-time/Remote/Internship)", name: "jobType" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={job[field.name]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={job.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loadingSubmit ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
