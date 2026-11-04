"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import FursatLogo from "@/components/FursatLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid staff credentials.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fursat-sand flex flex-col justify-between font-sans selection:bg-fursat-terracotta/20 px-4 py-8">
      {/* Top bar back link */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-semibold tracking-wider text-fursat-muted hover:text-fursat-charcoal transition-colors"
        >
          ← Back to Fursat Home
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-fursat-terracotta font-semibold">
          Staff Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white rounded-3xl border border-fursat-hairline shadow-lg p-6 sm:p-10 text-center">
          
          {/* Authentic Fursat Logo */}
          <div className="flex justify-center mb-5">
            <FursatLogo layout="vertical" size="lg" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] text-fursat-terracotta font-semibold block mb-1">
            Private Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fursat-green tracking-tight">
            STAFF LOGIN
          </h1>
          <p className="text-xs text-fursat-muted mt-1.5 mb-6">
            Authorized management panel for Fursat Kitchen &amp; Bar content
          </p>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-fursat-terracotta flex items-center gap-2 text-left animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-fursat-terracotta" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Username / Email Field */}
            <div>
              <label className="text-xs uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1.5">
                Staff Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. fursat_staff"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-fursat-sand-alt border border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal placeholder-fursat-muted/50 focus:outline-none focus:border-fursat-green transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs uppercase tracking-wider text-fursat-charcoal font-semibold block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fursat-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter staff security password"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-fursat-sand-alt border border-fursat-hairline text-xs sm:text-sm text-fursat-charcoal placeholder-fursat-muted/50 focus:outline-none focus:border-fursat-green transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-full btn-primary text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Login to Staff Panel</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-4 border-t border-fursat-hairline flex items-center justify-center gap-1.5 text-[10px] text-fursat-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-fursat-green" />
            <span>Encrypted Session • Authorized Fursat Personnel Only</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[11px] text-fursat-muted">
        © {new Date().getFullYear()} Fursat Kitchen &amp; Bar · Madhapur, Hyderabad
      </div>
    </div>
  );
}
