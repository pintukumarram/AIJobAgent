export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const url = `${API_BASE.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed: ${res.status}`);
  }

  return res.json();
}
