"use client";

import React, { useState, useCallback, useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dynamically import Lucide icons for no SSR usage
const MenuIcon = dynamic(() => import("lucide-react").then((mod) => mod.Menu), { ssr: false });
const CloseIcon = dynamic(() => import("lucide-react").then((mod) => mod.X), { ssr: false });

import Logo from "@/assets/headerimages/logosaas.png";
import arrowRightUrl from "@/assets/headerimages/next (1).png";

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header() {
  const router = useRouter();

  // Use SWR to fetch the auth status + user role in real time (poll every 5 seconds)
  const { data, error, mutate } = useSWR("/api/auth/me", fetcher, { refreshInterval: 5000 });
  const isAuthenticated = data?.isAuthenticated || false;
  const userRole = data?.user?.role; // e.g. "admin" or "user"

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // For mobile responsiveness: close menu if window is resized to desktop
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
                  className="bg-gradient-to-b from-[#faf1e0] to-[#f5e9d0] p-8 rounded-xl shadow-2xl border border-[#d9bc8b] w-full max-w-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5e3c] via-[#c4a484] to-[#8b5e3c]"></div>

                  <div className="mb-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mx-auto mb-4 bg-[#8b5e3c]/10 w-16 h-16 rounded-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#8b5e3c]"
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
                      className="text-[#5a3e1b] font-bold text-xl mb-2"
                    >
                      Sign in Required
                    </motion.h3>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[#7d5a3b] leading-relaxed"
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
                    <button
                      onClick={() => router.push("/signin")}
                      className="bg-[#8b5e3c] text-white px-4 py-3 rounded-lg hover:bg-[#6d4426] transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                    </button>

                    <button
                      onClick={() => router.push("/signup")}
                      className="bg-transparent border border-[#8b5e3c] text-[#8b5e3c] px-4 py-3 rounded-lg hover:bg-[#8b5e3c]/10 transition-all duration-300 font-medium"
                    >
                      Create an Account
                    </button>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#c4a484]/10 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />

                  <motion.button
                    onClick={() => setIsPromptOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute top-4 right-4 text-[#5a3e1b] hover:text-[#8b5e3c] bg-[#f5e9d0] rounded-full p-1.5 shadow-sm"
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

          <header className="sticky top-0 z-40 bg-[#faf1e0]/80 backdrop-blur-md shadow-md border-b border-[#c4a484]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
              className="flex justify-center items-center py-3 bg-[#8b5e3c] text-white text-sm gap-3"
            >
              <p className="text-white/80 hidden md:block">
                Explore CaviteVenture through history and culture
              </p>
              <Link href="/signup" className="inline-flex gap-1 items-center group">
                <motion.p
                  whileHover={{ color: "#c4a484" }}
                  transition={{ duration: 0.2 }}
                  className="font-bold uppercase"
                >
                  Get Started for Free
                </motion.p>
                <Image
                  src={arrowRightUrl}
                  alt="Arrow right icon"
                  height={16}
                  width={16}
                  className="h-4 w-4"
                  priority
                />
              </Link>
            </motion.div>

            <div className="py-5 container mx-auto px-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={Logo}
                  alt="CaviteVenture Logo"
                  width={40}
                  height={40}
                  className="rounded-lg border border-[#c4a484] shadow-md"
                  priority
                />
                <span className="text-lg font-bold text-[#5a3e1b]">CaviteVenture</span>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[#5a3e1b] hover:bg-[#c4a484]/20 rounded-md"
              >
                {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>

              <nav className="hidden md:flex gap-6 text-[#5a3e1b]/80 items-center">
                {["Home", "About", "Events"].map((link) => (
                  <button
                    key={link}
                    onClick={() =>
                      link === "Events"
                        ? setIsPromptOpen(true)
                        : router.push(link === "Home" ? "/" : `/${link.toLowerCase()}`)
                    }
                    className="font-bold uppercase hover:text-[#8b5e3c] transition"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>
          </header>
        </>
      )}

      {/* ----------------------- PRIVATE NAVBAR: ADMIN ----------------------- */}
      {isAuthenticated && userRole === "admin" && (
        <header className="sticky top-0 z-40 bg-[#faf1e0]/80 backdrop-blur-md shadow-md border-b border-[#c4a484]">
          <div className="py-5 container mx-auto px-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="CaviteVenture Logo"
                width={40}
                height={40}
                className="rounded-lg border border-[#c4a484] shadow-md"
                priority
              />
              <span className="text-lg font-bold text-[#5a3e1b]">CaviteVenture</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#5a3e1b] hover:bg-[#c4a484]/20 rounded-md"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>

            <nav className="hidden md:flex gap-6 text-[#5a3e1b]/80 items-center">
              <Link
                href="/dashboard"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Dashboard
              </Link>
              <Link
                href="/createevent"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Create Event
              </Link>
              <Link
                href="/profilepage"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Profile
              </Link>
            </nav>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-[#faf1e0] border-t border-[#c4a484]"
              >
                <ul className="flex flex-col gap-4 p-4 text-[#5a3e1b]/80">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/createevent"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profilepage"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* ----------------------- PRIVATE NAVBAR: REGULAR USER ----------------------- */}
      {isAuthenticated && userRole !== "admin" && (
        <header className="sticky top-0 z-40 bg-[#faf1e0]/80 backdrop-blur-md shadow-md border-b border-[#c4a484]">
          <div className="py-5 container mx-auto px-4 flex items-center justify-between">
            <Link href="/homepage" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="CaviteVenture Logo"
                width={40}
                height={40}
                className="rounded-lg border border-[#c4a484] shadow-md"
                priority
              />
              <span className="text-lg font-bold text-[#5a3e1b]">CaviteVenture</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#5a3e1b] hover:bg-[#c4a484]/20 rounded-md"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>

            <nav className="hidden md:flex gap-6 text-[#5a3e1b]/80 items-center">
              <Link
                href="/homepage"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Home
              </Link>
              <Link
                href="/eventpage"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Events
              </Link>
              <Link
                href="/exhibitpage"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Exhibit
              </Link>
              <Link
                href="/profilepage"
                className="font-bold uppercase hover:text-[#8b5e3c] transition"
              >
                Profile
              </Link>
            </nav>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-[#faf1e0] border-t border-[#c4a484]"
              >
                <ul className="flex flex-col gap-4 p-4 text-[#5a3e1b]/80">
                  <li>
                    <Link
                      href="/homepage"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/eventpage"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/exhibitpage"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Exhibit
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profilepage"
                      className="block font-bold uppercase hover:text-[#8b5e3c] transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      )}
    </>
  );
}
