"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus("Sign in successful!")
        // Navigate to /homepage
        setTimeout(() => {
          router.push("/homepage")
        }, 1000)
      } else {
        setStatus(data.message || "Sign in error.")
      }
    } catch (err) {
      console.error(err)
      setStatus("An error occurred during sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6] p-4">
      <div className="bg-[#faf6f0] rounded-lg shadow-md max-w-lg w-full p-8 border border-[#e6dfd3]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#5d4037]">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* email field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#5d4037]">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#d7ccc8] rounded focus:outline-none focus:border-[#8d6e63] bg-[#fefefe]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#5d4037]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border border-[#d7ccc8] rounded focus:outline-none focus:border-[#8d6e63] bg-[#fefefe]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d6e63]"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {status && (
            <p className={`mt-2 font-semibold ${status.includes("error") ? "text-red-600" : "text-green-600"}`}>
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 p-3 rounded text-white font-medium ${
              isLoading ? "bg-[#a1887f] cursor-not-allowed" : "bg-[#795548] hover:bg-[#5d4037] transition-colors"
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-[#8d6e63]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#5d4037] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

