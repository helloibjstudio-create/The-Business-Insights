"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";


export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || "Login failed");
      setLoading(false);
      return;
    }

    localStorage.setItem("admin_token", result.token);
    onLogin();
  };



  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black/70 border border-gray-800 backdrop-blur-xl p-10 rounded-2xl w-[90%] max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Admin Login
        </h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 bg-transparent border border-gray-700 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-transparent border border-gray-700 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-black font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
