"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("Sign in successful!");
        // Redirect based on user role
        setTimeout(() => {
          if (data.role === "superadmin") {
            router.push("/superadmindashboard");
          } else if (data.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/homepage");
          }
        }, 1000);
      } else {
        setStatus(data.message || "Sign in error.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred during sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6] p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 sm:p-8 border border-[#e6dfd3] transition-all duration-300 hover:shadow-xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-[#f8f5f0] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <LogIn size={28} className="text-[#8d6e63]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5d4037]">
            Welcome Back
          </h2>
          <p className="text-[#8d6e63] mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5d4037]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-[#a1887f]" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent bg-[#faf6f0] transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-[#5d4037]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#8d6e63] hover:text-[#5d4037] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-[#a1887f]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 border border-[#e6dfd3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent bg-[#faf6f0] transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d6e63] hover:text-[#5d4037] transition-colors"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {status && (
            <div
              className={`p-3 rounded-lg ${
                status.includes("error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <p className="text-sm font-medium">{status}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#8d6e63] hover:bg-[#5d4037] text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#8d6e63] disabled:hover:shadow-sm"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <p className="text-[#8d6e63] text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#5d4037] font-medium hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
