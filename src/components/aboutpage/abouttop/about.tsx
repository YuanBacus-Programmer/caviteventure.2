"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Shrine from "@/components/aboutpage/aboutshrine/shrine";

const AboutUs = () => {
  const scrollToExplore = () => {
    const exploreSection = document.getElementById("explore");
    exploreSection?.scrollIntoView({ behavior: "smooth" });
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: -3,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.4 },
    },
    rest: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.4 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-[#fae8b4] to-[#EAEEFE] overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="hero-section flex flex-col md:flex-row justify-center items-center min-h-screen text-left space-y-8 md:space-y-0"
      >
        <div className="flex-1 px-6 md:px-16 lg:px-24 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🔍 Unlock Cavite’s Best-Kept Secrets!
          </motion.h1>
          <motion.p
            className="text-md sm:text-lg md:text-xl lg:text-2xl mt-5 text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to **Cavite Venture**—your ultimate guide to the hidden wonders of Cavite! 🌿✨ Step off the beaten path and uncover **historic landmarks, breathtaking attractions, and secret spots** waiting to be explored.
          </motion.p>
          <motion.p
            className="text-md sm:text-lg md:text-xl lg:text-2xl mt-5 text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Whether you're a **history buff, adventure seeker,** or just curious, we’ll take you on a journey through Cavite’s most captivating destinations.
          </motion.p>
          <p className="mt-4 text-lg font-semibold">Ready to explore? Let’s go! 🚀</p>
          
          {/* CTA Button - White & Black */}
          <div className="mt-10">
            <motion.button
              onClick={scrollToExplore}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black border border-black hover:bg-black hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
            >
              Explore More
            </motion.button>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Shrine />
        </div>
      </motion.div>

    </div>
  );
};

export default AboutUs;
