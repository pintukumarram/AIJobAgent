"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardPage from "../../components/DashboardPage";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return user ? <DashboardPage /> : null;
}
