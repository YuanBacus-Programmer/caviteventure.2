"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivateNav() {
  return (
    <motion.nav
      // Animate the navbar container itself
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl font-bold text-blue-600"
        >
          Cavite Venture Museum
        </motion.div>

        {/* Nav Links */}
        <motion.ul
          className="flex space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/homepage" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/eventpage" className="text-gray-700 hover:text-blue-600 font-medium">
              Event
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/exihibitpage" className="text-gray-700 hover:text-blue-600 font-medium">
              Exhibit
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/profilepage" className="text-gray-700 hover:text-blue-600 font-medium">
              Profile
            </Link>
          </motion.li>
        </motion.ul>
      </div>
    </motion.nav>
  );
}
