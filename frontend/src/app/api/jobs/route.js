import { NextResponse } from "next/server";

export async function GET() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Pvt Ltd",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8 - ₹12 LPA",
      link: "https://example.com/frontend",
      status: "Applied",
      date: "2025-10-03",
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "DataCore Solutions",
      location: "Remote",
      type: "Internship",
      salary: "₹15,000/month",
      link: "https://example.com/data",
      status: "Interview",
      date: "2025-10-02",
    },
  ];

  return NextResponse.json({ jobs });
}
