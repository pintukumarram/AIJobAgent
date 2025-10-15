"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login using token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiRequest("/users/profile", "GET", null, token)
        .then((res) => setUser(res))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiRequest("/users/login", "POST", { email, password });
      localStorage.setItem("token", res.token);
      setUser(res.user);
      return res;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (name, email, password,role="user") => {
    try {
      const res = await apiRequest("/users/register", "POST", {
    name,
    email,
    password,
    role,
  });
      return res;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      // Optional: Notify backend for logout if your backend supports it
      await apiRequest("/users/logout", "POST", null, localStorage.getItem("token"));
    } catch (error) {
      // Log out anyway, backend error should not block client logout
      console.error("Backend logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
