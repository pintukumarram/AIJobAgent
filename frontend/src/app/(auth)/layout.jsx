"use client";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-indigo-600 text-white rounded-full p-3 shadow-lg mb-3"
          >
            <span className="font-bold text-lg">AI</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Job<span className="text-indigo-600">Agent</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Smart AI Job Automation
          </p>
        </div>

        {/* Render page (login/register/forgot-password) */}
        {children}
      </motion.div>
    </div>
  );
}
