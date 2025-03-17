"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MenuIcon = dynamic(() => import("lucide-react").then((mod) => mod.Menu), { ssr: false });
const CloseIcon = dynamic(() => import("lucide-react").then((mod) => mod.X), { ssr: false });

import Logo from "@/assets/headerimages/logosaas.png";
import arrowRightUrl from "@/assets/headerimages/next (1).png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const router = useRouter();

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <>
      {/* Prompt Modal */}
      <AnimatePresence>
        {isPromptOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <div className="bg-[#faf1e0] p-6 rounded-lg shadow-xl border border-[#c4a484] w-80 text-center relative">
              <p className="text-[#5a3e1b] font-semibold text-lg">You need to sign in to view the events.</p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => router.push("/signin")}
                  className="bg-[#8b5e3c] text-white px-4 py-2 rounded-lg hover:bg-[#6d4426] transition"
                >
                  Sign In
                </button>
              </div>
              <motion.button
                onClick={() => setIsPromptOpen(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute top-3 right-3 text-[#5a3e1b] hover:text-[#8b5e3c]"
              >
                <CloseIcon className="h-6 w-6" />
              </motion.button>
            </div>
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
          <p className="text-white/80 hidden md:block">Explore CaviteVenture through history and culture</p>
          <Link href="/signup" className="inline-flex gap-1 items-center group">
            <motion.p whileHover={{ color: "#c4a484" }} transition={{ duration: 0.2 }} className="font-bold uppercase">
              Get Started for Free
            </motion.p>
            <Image src={arrowRightUrl} alt="Arrow right icon" height={16} width={16} className="h-4 w-4" priority />
          </Link>
        </motion.div>

        <div className="py-5 container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Saas logo" width={40} height={40} className="rounded-lg border border-[#c4a484] shadow-md" priority />
            <span className="text-lg font-bold text-[#5a3e1b]">CaviteVenture</span>
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#5a3e1b] hover:bg-[#c4a484]/20 rounded-md">
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex gap-6 text-[#5a3e1b]/80 items-center">
            {["Home", "About", "Events"].map((link) => (
              <button
                key={link}
                onClick={() =>
                  link === "Events" ? setIsPromptOpen(true) : router.push(link === "Home" ? "/" : `/${link.toLowerCase()}`)
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
  );
}