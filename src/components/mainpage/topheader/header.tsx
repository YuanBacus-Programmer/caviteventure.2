"use client"

import { useState, useCallback, useEffect } from "react"
import useSWR from "swr"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Dynamically import Lucide icons for no SSR usage
const MenuIcon = dynamic(() => import("lucide-react").then((mod) => mod.Menu), { ssr: false })
const CloseIcon = dynamic(() => import("lucide-react").then((mod) => mod.X), { ssr: false })

import Logo from "@/assets/headerimages/logosaas.png"
import arrowRightUrl from "@/assets/headerimages/next (1).png"

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Header() {
  const router = useRouter()

  // Use SWR to fetch the auth status + user role in real time (poll every 5 seconds)
  const { data, error, mutate } = useSWR("/api/auth/me", fetcher, { refreshInterval: 5000 })
  const isAuthenticated = data?.isAuthenticated || false
  const userRole = data?.user?.role // e.g. "admin" or "user"

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  // For mobile responsiveness: close menu if window is resized to desktop
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  return (
    <>
      {/* ----------------------- PUBLIC NAVBAR ----------------------- */}
      {!isAuthenticated && (
        <>
          <AnimatePresence>
            {isPromptOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-gradient-to-b from-[#f5f0e5] to-[#e6d7c3] p-8 rounded-xl shadow-2xl border border-[#d7c3a7] w-full max-w-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#654321] via-[#8B4513] to-[#654321]"></div>

                  <div className="mb-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mx-auto mb-4 bg-[#654321]/10 w-16 h-16 rounded-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#654321]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </motion.div>
                    <motion.h3
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#654321] font-bold text-xl mb-2"
                    >
                      Sign in Required
                    </motion.h3>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[#8B4513] leading-relaxed"
                    >
                      Please sign in to your account to view and register for our exclusive events and exhibitions.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    <motion.button
                      onClick={() => {
                        setIsPromptOpen(false)
                        router.push("/signin")
                      }}
                      className="bg-[#654321] text-[#f5f0e5] px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md"
                      whileHover={{
                        backgroundColor: "#8B4513",
                        scale: 1.02,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign In
                    </motion.button>

                    <motion.button
                      onClick={() => router.push("/signup")}
                      className="bg-transparent border border-[#654321] text-[#654321] px-4 py-3 rounded-lg transition-all duration-300 font-medium"
                      whileHover={{
                        backgroundColor: "rgba(101, 67, 33, 0.1)",
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create an Account
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#8B4513]/10 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />

                  <motion.button
                    onClick={() => setIsPromptOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute top-4 right-4 text-[#654321] hover:text-[#8B4513] bg-[#f5f0e5] rounded-full p-1.5 shadow-sm"
                    aria-label="Close dialog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <header className="sticky top-0 z-40 bg-[#f5f0e5]/80 backdrop-blur-md shadow-md border-b border-[#d7c3a7]">
            <div className="py-5 container mx-auto px-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={Logo || "/placeholder.svg"}
                  alt="CaviteVenture Logo"
                  width={40}
                  height={40}
                  className="rounded-lg border border-[#d7c3a7] shadow-md"
                  priority
                />
                <span className="text-lg font-bold text-[#654321]">CaviteVenture</span>
              </Link>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[#654321] hover:bg-[#d7c3a7]/20 rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </motion.button>

              <nav className="hidden md:flex gap-6 text-[#654321]/80 items-center">
                {["Home", "About", "Events"].map((link) => (
                  <motion.button
                    key={link}
                    onClick={() =>
                      link === "Events"
                        ? setIsPromptOpen(true)
                        : router.push(link === "Home" ? "/" : `/${link.toLowerCase()}`)
                    }
                    className="font-bold uppercase hover:text-[#8B4513] transition"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link}
                  </motion.button>
                ))}
              </nav>
            </div>
          </header>
        </>
      )}

      {/* ----------------------- PRIVATE NAVBAR: ADMIN ----------------------- */}
      {isAuthenticated && userRole === "admin" && (
        <header className="sticky top-0 z-40 bg-[#f5f0e5]/80 backdrop-blur-md shadow-md border-b border-[#d7c3a7]">
          <div className="py-5 container mx-auto px-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="CaviteVenture Logo"
                width={40}
                height={40}
                className="rounded-lg border border-[#d7c3a7] shadow-md"
                priority
              />
              <span className="text-lg font-bold text-[#654321]">CaviteVenture</span>
            </Link>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#654321] hover:bg-[#d7c3a7]/20 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </motion.button>

            <nav className="hidden md:flex gap-6 text-[#654321]/80 items-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Dashboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/createevent" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Create Event
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/profilepage" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Profile
                </Link>
              </motion.div>
            </nav>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-[#f5f0e5] border-t border-[#d7c3a7]"
              >
                <ul className="flex flex-col gap-4 p-4 text-[#654321]/80">
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/dashboard"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/createevent"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Event
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/profilepage"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </motion.li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* ----------------------- PRIVATE NAVBAR: REGULAR USER ----------------------- */}
      {isAuthenticated && userRole !== "admin" && (
        <header className="sticky top-0 z-40 bg-[#f5f0e5]/80 backdrop-blur-md shadow-md border-b border-[#d7c3a7]">
          <div className="py-5 container mx-auto px-4 flex items-center justify-between">
            <Link href="/homepage" className="flex items-center gap-2">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="CaviteVenture Logo"
                width={40}
                height={40}
                className="rounded-lg border border-[#d7c3a7] shadow-md"
                priority
              />
              <span className="text-lg font-bold text-[#654321]">CaviteVenture</span>
            </Link>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#654321] hover:bg-[#d7c3a7]/20 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </motion.button>

            <nav className="hidden md:flex gap-6 text-[#654321]/80 items-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/homepage" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Home
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/eventpage" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Events
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/exhibitpage" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Exhibit
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/profilepage" className="font-bold uppercase hover:text-[#8B4513] transition">
                  Profile
                </Link>
              </motion.div>
            </nav>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-[#f5f0e5] border-t border-[#d7c3a7]"
              >
                <ul className="flex flex-col gap-4 p-4 text-[#654321]/80">
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/homepage"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/eventpage"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Events
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/exhibitpage"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Exhibit
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5, color: "#8B4513" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href="/profilepage"
                      className="block font-bold uppercase transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </motion.li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      )}
    </>
  )
}
