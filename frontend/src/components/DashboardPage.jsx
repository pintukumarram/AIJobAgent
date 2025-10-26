"use client";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Search,
  PlusCircle,
  Trash2,
  Eye,
  Edit,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import JobsTable from "./JobsTable"; // ✅ Imported component for job seekers

const CHART_DATA = [
  { day: "Mon", applications: 3 },
  { day: "Tue", applications: 7 },
  { day: "Wed", applications: 4 },
  { day: "Thu", applications: 8 },
  { day: "Fri", applications: 5 },
  { day: "Sat", applications: 10 },
  { day: "Sun", applications: 6 },
];

const TABLE_HEADERS = [
  "Title",
  "Company",
  "Location",
  "Salary",
  "Type",
  "Actions",
];

const CHART_STYLE = {
  backgroundColor: "#1F2937",
  borderRadius: "15px",
  border: "none",
  color: "#F9FAFB",
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecruiterJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = await apiRequest("/jobs/my-jobs", "GET", null, token);
      setJobs(data.jobs || data);
    } catch (err) {
      console.error("Error fetching recruiter jobs:", err);
      alert("Failed to load your jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      const token = localStorage.getItem("token");
      await apiRequest(`/jobs/${id}`, "DELETE", null, token);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      alert("✅ Job deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete job");
    }
  };

  useEffect(() => {
    if (user?.role === "recruiter") {
      fetchRecruiterJobs();
    }
  }, [user]);

  const stats = [
    {
      title: "Jobs Scraped",
      value: "245",
      icon: <Search className="text-blue-500" />,
      color: "bg-red-300 dark:bg-red-900/50",
      link: "/jobs",
    },
    {
      title: "Matched Jobs",
      value: "112",
      icon: <Briefcase className="text-green-500" />,
      color: "bg-green-300 dark:bg-green-900/40",
      link: "/jobs",
    },
    {
      title: "Applications Sent",
      value: "89",
      icon: <CheckCircle className="text-purple-500" />,
      color: "bg-purple-200 dark:bg-purple-900/40",
      link: "/profile",
    },
    {
      title: "Pending Replies",
      value: "23",
      icon: <Clock className="text-amber-500" />,
      color: "bg-amber-300 dark:bg-amber-900/40",
      link: "/settings",
    },
  ];

  if (!user) return null;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {user.role === "recruiter" ? "Recruiter Dashboard" : "Job Seeker Dashboard"}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            onClick={() => router.push(stat.link)}
          />
        ))}
      </div>

      {/* Chart Section */}
      <ChartSection />

      {/* Role-Specific Content */}
      {user.role === "recruiter" ? (
        <RecruiterJobsSection
          jobs={jobs}
          loading={loading}
          router={router}
          handleDelete={handleDelete}
        />
      ) : (
        <JobSeekerSection />
      )}
    </div>
  );
}

// ✅ Extracted Chart Component
function ChartSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Weekly Applications Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={CHART_STYLE} />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 5, fill: "#6366F1" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ✅ Extracted Recruiter Jobs Section
function RecruiterJobsSection({ jobs, loading, router, handleDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Your Posted Jobs
        </h2>
        <button
          onClick={() => router.push("/jobs/new")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} />
          Post New Job
        </button>
      </div>

      {loading ? (
        <LoadingState />
      ) : jobs.length === 0 ? (
        <EmptyState router={router} />
      ) : (
        <RecruiterJobsTable jobs={jobs} router={router} handleDelete={handleDelete} />
      )}
    </div>
  );
}

// ✅ Extracted Loading State
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="ml-3 text-gray-500">Loading jobs...</p>
    </div>
  );
}

// ✅ Extracted Empty State
function EmptyState({ router }) {
  return (
    <div className="text-center py-8">
      <p className="text-gray-500 mb-4">No jobs posted yet.</p>
      <button
        onClick={() => router.push("/jobs/new")}
        className="text-blue-600 hover:underline"
      >
        Post your first job →
      </button>
    </div>
  );
}

// ✅ RENAMED: RecruiterJobsTable (was JobsTable)
function RecruiterJobsTable({ jobs, router, handleDelete }) {
  const cellStyles = "p-3 text-gray-600 dark:text-gray-400";
  const buttonBaseStyles = "flex items-center gap-1 transition";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className={`p-3 text-left text-gray-700 dark:text-gray-200 ${
                  header === "Actions" ? "text-center" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                {job.title}
              </td>
              <td className={cellStyles}>{job.company}</td>
              <td className={cellStyles}>{job.location || "N/A"}</td>
              <td className={cellStyles}>{job.salary || "N/A"}</td>
              <td className="p-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                  {job.type || "Full-time"}
                </span>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => router.push(`/jobs/${job._id}`)}
                    className={`${buttonBaseStyles} text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300`}
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => router.push(`/jobs/edit/${job._id}`)}
                    className={`${buttonBaseStyles} text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300`}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className={`${buttonBaseStyles} text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300`}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Job Seeker Section (uses imported JobsTable component)
function JobSeekerSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        My Applications
      </h2>
      <JobsTable />
    </div>
  );
}

// ✅ Stat Card Component
function StatCard({ title, value, icon, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`p-5 rounded-2xl ${color} shadow-sm flex items-center justify-between transition-all cursor-pointer hover:shadow-md`}
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </h3>
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-full p-3 shadow-sm">
        {icon}
      </div>
    </motion.div>
  );
}
