"use client";
import React, { useState } from "react";
import { apiRequest } from "../../utils/api";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Select a file first.");

    const formData = new FormData();
    formData.append("file", resume);

    try {
      const res = await apiRequest("/ai/parse-resume", "POST", formData, null, true);
      setSkills(res.skills || []);
      setExperience(res.experience || []);
      toast.success("✅ Resume parsed!");
    } catch (err) {
      toast.error("❌ Failed to parse resume");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Upload Resume</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Parse Resume</button>
      </form>

      {skills.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold">Skills</h2>
          <p>{skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
