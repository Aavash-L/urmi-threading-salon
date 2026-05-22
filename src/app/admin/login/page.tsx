"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-lavender-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 card-shadow w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Staff Login</h1>
          <p className="text-sm text-gray-500 mt-1">Urmi Threading Salon — Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-lavender-100 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-brand-purple transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-gradient text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
