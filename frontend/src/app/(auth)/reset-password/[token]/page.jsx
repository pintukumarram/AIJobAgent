"use client";
import { useState } from "react";
import { apiRequest } from "../../../utils/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(`/users/reset-password/${token}`, "POST", { password });
      toast.success("Password reset successful!");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
}
