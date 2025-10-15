const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  async post(endpoint, data) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "API Error");
    return result;
  },

  async get(endpoint) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "API Error");
    return result;
  },
};

// Add and export fetchJobs
export const fetchJobs = () => api.get("/jobs");
