"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollToTopButton from "@/components/mainpage/mainscrolltop/scrolltotopbutton"; // Import the component

import starImage from "@/assets/calltoactionimages/star.png";
import springImage from "@/assets/calltoactionimages/spring.png";

export const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#cbbd93] py-24 xl:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Section Heading */}
        <div className="relative text-center">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-b from-black to-[#cbbd93] text-transparent bg-clip-text leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Sign Up for Free Today
          </motion.h2>

          <motion.p
            className="mt-5 text-md sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Enjoy exploring and discovering **Cavite Ventures** in your own hands.
          </motion.p>

          {/* Decorative Images */}
          <motion.div
            className="absolute hidden lg:block -left-[350px] -top-[137px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={starImage}
              alt="Star Image"
              width={360}
              height={360}
              loading="lazy"
              sizes="(max-width: 1024px) 200px, 360px"
            />
          </motion.div>

          <motion.div
            className="absolute hidden lg:block -right-[331px] -top-[19px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={springImage}
              alt="Spring Image"
              width={360}
              height={360}
              loading="lazy"
              sizes="(max-width: 1024px) 200px, 360px"
            />
          </motion.div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
          <Link href="/signup">
            <motion.button
              className="px-6 py-3 rounded-md text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore for Free
            </motion.button>
          </Link>

          {/* Scroll To Top Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ScrollToTopButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
