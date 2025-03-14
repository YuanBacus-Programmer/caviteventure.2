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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 flex flex-col p-4"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end p-2 text-black hover:bg-gray-200 rounded-md"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            {["Home", "About", "Events"].map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="font-bold uppercase hover:text-[#fae8b4] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-md shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3"
        >
          <p className="text-white/60 hidden md:block">Explore CaviteVenture in a more Modern world</p>
          <Link href="/signup" className="inline-flex gap-1 items-center group">
            <motion.p whileHover={{ color: "#fae8b4" }} transition={{ duration: 0.2 }} className="font-bold uppercase">
              Get Started for Free
            </motion.p>
            <Image src={arrowRightUrl} alt="Arrow right icon" height={16} width={16} className="h-4 w-4" priority />
          </Link>
        </motion.div>

        <div className="py-5 container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Saas logo" width={40} height={40} className="rounded-lg" priority />
            <span className="text-lg font-bold text-black">CaviteVenture</span>
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-black hover:bg-gray-200 rounded-md">
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            {["Home", "About", "Events"].map((link) => (
              <Link key={link} href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="font-bold uppercase hover:text-[#fae8b4]">
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
