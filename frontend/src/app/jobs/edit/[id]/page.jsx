"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiRequest } from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading } = useAuth();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await apiRequest(`/jobs/${params.id}`, "GET", null, token);
        setJob(data);
      } catch {
        toast.error("Failed to load job");
      }
    };
    fetchJob();
  }, [params.id]);

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const token = localStorage.getItem("token");
      console.log("📦 token being sent:", token);
      await apiRequest(`/jobs/${params.id}`, "PUT", job, token);
      toast.success("✅ Job updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  if (!user || (user.role !== "recruiter" && user.role !== "admin"))
    return (
      <p className="text-center text-red-600 mt-20">
        ❌ Unauthorized Access
      </p>
    );

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✏️ Edit Job
        </h1>

        {Object.keys(job).map(
          (key) =>
            key !== "_id" &&
            key !== "__v" &&
            key !== "postedBy" && (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === "description" ? (
                  <textarea
                    name={key}
                    rows={4}
                    value={job[key]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={job[key]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </div>
            )
        )}

        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loadingSubmit ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
