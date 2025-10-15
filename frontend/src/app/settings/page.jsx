"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Settings
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Dark mode toggle, notifications, and preferences will appear here.
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
