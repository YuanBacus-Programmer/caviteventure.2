"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Merriweather } from "next/font/google";

import ArrowIcon from "@/assets/headerimages/next.png";
import cogImage from "@/assets/heroimages/cog.png";

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  const [isModalOpen, setModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  // Use translateY to apply scrolling effect
  const translateY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={heroRef}
      className={`pt-20 pb-40 md:pt-24 md:pb-48 lg:pt-28 lg:pb-56 xl:pt-36 xl:pb-64 bg-[radial-gradient(ellipse_at_bottom_left,#fae8b4,#EAEEFE_100%)] overflow-hidden ${merriweather.className}`}
    >
      <div className="container px-10 mx-auto lg:px-20 xl:px-40 2xl:px-56 4xl:px-96 max-w-screen-8xl">
        <div className="flex flex-col md:flex-row items-center gap-20">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-lg md:text-xl inline-flex border border-gray-300 px-5 py-2 rounded-lg tracking-tight bg-white">
              CaviteVenture 2.0 is here
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-10xl font-bold tracking-tight bg-gradient-to-b from-black to-[#cbbd93] text-transparent bg-clip-text mt-8">
              Pathway to a Modern Exhibit
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-[#010D3E] tracking-tight mt-6 max-w-lg lg:max-w-2xl mx-auto md:mx-0">
              Explore with an app designed to track your progress and inspire your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center mt-8">
              <Link href="/signup" className="w-full sm:w-auto">
                <button className="btn btn-primary w-full sm:w-auto text-lg lg:text-xl xl:text-2xl">Explore for Free</button>
              </Link>
              <button
                className="btn btn-text gap-3 flex items-center w-full sm:w-auto justify-center text-lg lg:text-xl xl:text-2xl"
                onClick={() => setModalOpen(true)}
              >
                <span>Learn More</span>
                <Image src={ArrowIcon} alt="Arrow icon" height={28} width={28} className="h-7 w-7 lg:h-10 lg:w-10" />
              </button>
            </div>
          </motion.div>

          {/* Animated Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-96 sm:w-[32rem] lg:w-[48rem] xl:w-[64rem] 4xl:w-[140rem]"
              animate={{ translateY: [-20, 20] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" }}
              style={{ y: translateY }} // ✅ Applied translateY
            >
              <Image
                src={cogImage}
                alt="Innovation Cog"
                className="rounded-lg"
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, (max-width: 4000px) 20vw, (max-width: 8000px) 15vw, 10vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <motion.div
            className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-xl" onClick={() => setModalOpen(false)}>
              &times;
            </button>
            <h2 className="text-4xl font-bold mb-6 text-center">About Cavite Venture</h2>
            <p className="text-xl text-gray-700 text-center">
              Cavite Venture is an innovative platform promoting historical and attraction sites within Cavite. With interactive exhibits and an intuitive design, you can explore and trace your journey effortlessly.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
