"use client"

import { useState, useEffect } from "react"
import RainingLetters from "./RainingLetters"
import SignUpForm from "@/components/forms/signupform/signup-form"

export default function SignUpWithAnimation() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show the animation for 5 seconds before displaying the form
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return <div className="min-h-screen">{loading ? <RainingLetters /> : <SignUpForm />}</div>
}

