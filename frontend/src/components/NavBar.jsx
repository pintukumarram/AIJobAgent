"use client";
import React from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-20">
      
      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-md bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
        <Search size={18} className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search jobs..."
          className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          {theme === "light" ? (
            <Moon size={18} className="text-gray-700" />
          ) : (
            <Sun size={18} className="text-yellow-400" />
          )}
        </button>

        {/* Notifications */}
        <Bell size={20} className="text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer">
          J
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
