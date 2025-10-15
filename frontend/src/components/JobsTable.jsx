"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const JobsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechNova Pvt Ltd",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8 - ₹12 LPA",
      link: "https://example.com/frontend-job",
      status: "Applied",
      date: "2025-10-03",
    },
    {
      title: "Data Analyst Intern",
      company: "DataCore Solutions",
      location: "Remote",
      type: "Internship",
      salary: "₹15,000/month",
      link: "https://example.com/data-analyst",
      status: "Interview",
      date: "2025-10-02",
    },
    {
      title: "Backend Engineer",
      company: "CodeSphere",
      location: "Pune, India",
      type: "Remote",
      salary: "₹10 - ₹15 LPA",
      link: "https://example.com/backend-job",
      status: "Rejected",
      date: "2025-09-28",
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      (statusFilter === "All" || job.status === statusFilter) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
      case "Interview":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="mt-10 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-0">
          Job Applications
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                  {job.title}
                </td>
                <td className="px-4 py-3">{job.company}</td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3">{job.type}</td>
                <td className="px-4 py-3">{job.salary}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3">{job.date}</td>
                <td className="px-4 py-3">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-400"
                  >
                    Apply ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No matching jobs found.
        </p>
      )}
    </div>
  );
};

export default JobsTable;
