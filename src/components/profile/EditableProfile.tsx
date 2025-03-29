"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type EditableProfileProps = {
  initialName: string
  initialEmail: string
  initialCity: string
  initialGender: "male" | "female"
  initialProfilePicture?: string
}

export default function EditableProfile({
  initialName,
  initialEmail,
  initialCity,
  initialGender,
  initialProfilePicture,
}: EditableProfileProps) {
  const router = useRouter()
  const [name, setName] = useState(initialName)
  const [city, setCity] = useState(initialCity)
  const [gender, setGender] = useState<"male" | "female">(initialGender)
  const [profilePicture, setProfilePicture] = useState<string | undefined>(initialProfilePicture)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Simulate an image upload; in production, upload to S3/Cloudinary, etc.
  const handleFileUpload = async (file: File): Promise<string> => {
    setUploading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        setUploading(false)
        resolve(url)
      }, 2000) // simulate 2 seconds delay
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      // Immediately show a preview (object URL)
      const previewUrl = URL.createObjectURL(file)
      setProfilePicture(previewUrl)
      // Simulate the upload process
      const uploadedUrl = await handleFileUpload(file)
      setProfilePicture(uploadedUrl)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("")
    setIsSaving(true)
    try {
      const res = await fetch("/api/auth/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, gender, profilePicture }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus("Profile updated successfully.")
        // After a short delay, navigate back to the main profile page.
        setTimeout(() => {
          router.push("/profilepage")
        }, 1500)
      } else {
        setStatus(data.message || "Failed to update profile.")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setStatus("An error occurred while updating your profile.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setName(initialName)
    setCity(initialCity)
    setGender(initialGender)
    setProfilePicture(initialProfilePicture)
    setStatus("")
  }

  return (
    <form onSubmit={handleSave} className="bg-white shadow rounded-lg p-6 relative overflow-hidden">
      {/* Decorative building silhouette at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden opacity-10 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
          }}
        ></div>
      </div>

      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="relative">
          {profilePicture ? (
            <img
              src={profilePicture || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8B4513]"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-[#e6d7c3] flex items-center justify-center text-[#654321]">
              No Image
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-[#8B4513] text-[#f5f0e5] rounded-full p-2 cursor-pointer hover:bg-[#654321] transition shadow-md">
            {uploading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        <div>
          <label className="block text-xl font-semibold text-[#654321]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-3 border border-[#e6d7c3] rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-[#654321]">Email</label>
          <input
            type="email"
            value={initialEmail}
            readOnly
            className="mt-2 p-3 border border-[#e6d7c3] rounded w-full bg-[#f5f0e5] cursor-not-allowed text-[#8B4513]"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-[#654321]">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 p-3 border border-[#e6d7c3] rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-[#654321]">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="mt-2 p-3 border border-[#e6d7c3] rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {status && (
        <div className="mt-4 p-3 bg-[#f5f0e5] border border-[#e6d7c3] rounded text-[#654321] font-semibold">
          {status}
        </div>
      )}
      <div className="flex gap-4 mt-6 relative z-10">
        <button
          type="submit"
          disabled={isSaving}
          className={`flex-1 p-3 rounded text-white font-medium transition ${
            isSaving ? "bg-[#a67c52] cursor-not-allowed" : "bg-[#8B4513] hover:bg-[#654321]"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 p-3 rounded border border-[#e6d7c3] text-[#654321] hover:bg-[#f5f0e5] transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

