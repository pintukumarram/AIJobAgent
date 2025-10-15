"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Jobs", icon: <Briefcase size={18} />, path: "/jobs" },
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
            JobAgent
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {theme && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          )}

          {/* User Info */}
          <span className="hidden sm:inline text-gray-600 dark:text-gray-300 text-sm">
            Hi, Pintu 👋
          </span>

          <a href="/dashboard">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQEvyL7f592ELQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693688893381?e=1762992000&v=beta&t=1L7Q77GalS_tNSRqT3XETan22OWCh1dPZBG06JBO924"
              alt="User"
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600"
            />
          </a>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar (Desktop) */}
        <aside className="hidden sm:flex flex-col w-60 bg-white dark:bg-gray-800 shadow-md p-5">
          <nav className="space-y-2 mt-4">
            {navItems.map((item, i) => {
              const active = pathname.startsWith(item.path);
              return (
                <Link key={i} href={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      active
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        {/* Sidebar (Mobile) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 w-60 h-full bg-white dark:bg-gray-800 shadow-lg z-40 sm:hidden flex flex-col p-5"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  JobAgent
                </h2>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-3">
                {navItems.map((item, i) => (
                  <Link key={i} href={item.path}>
                    <div
                      onClick={toggleSidebar}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        pathname.startsWith(item.path)
                          ? "bg-indigo-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto absolute bottom-6 w-full left-0 px-5">
                <div
                  onClick={() => {
                    toggleSidebar();
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
