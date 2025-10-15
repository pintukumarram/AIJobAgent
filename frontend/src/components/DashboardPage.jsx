"use client";
import React from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Search,
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
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import JobsTable from "./JobsTable";

const data = [
  { day: "Mon", applications: 3 },
  { day: "Tue", applications: 7 },
  { day: "Wed", applications: 4 },
  { day: "Thu", applications: 8 },
  { day: "Fri", applications: 5 },
  { day: "Sat", applications: 10 },
  { day: "Sun", applications: 6 },
];

export default function DashboardPage() {
  const router = useRouter();

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

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} onClick={() => router.push(stat.link)} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Weekly Applications Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderRadius: "8px",
                border: "none",
                color: "#F9FAFB",
              }}
            />
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

      {/* Jobs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Recent Job Applications
        </h2>
        <JobsTable />
      </div>
    </div>
  );
}

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
