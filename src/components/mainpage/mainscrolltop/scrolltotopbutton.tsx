"use client"; // Enables client-side interactivity

import { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RightArrow from "@/assets/headerimages/next.png"; // Optimized image

const ScrollToTopButton: React.FC = () => {
  // Optimized function to handle scroll
  const handleScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.button
      onClick={handleScroll}
      aria-label="Scroll to top"
      className="flex items-center gap-3 px-6 py-3 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm sm:text-base lg:text-lg font-medium tracking-tight">
        Go Back Up
      </span>
      <Image
        src={RightArrow}
        alt="Right Arrow Icon"
        width={24}
        height={24}
        className="h-6 w-6"
        loading="lazy"
        sizes="(max-width: 768px) 20px, (max-width: 1200px) 24px, 24px"
      />
    </motion.button>
  );
};

export default ScrollToTopButton;
