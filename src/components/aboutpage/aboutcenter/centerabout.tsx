"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import historical images
import zapoteImage from "@/assets/history/cylinder.png";
import binakayanImage from "@/assets/history/BINAKAYAN2.jpg";
import sanRoqueImage from "@/assets/history/noodle.png";
import casaTejeroImage from "@/assets/history/Casadetajero.jpg";

// Timeline Data
const timelineEvents = [
  {
    year: "June 13, 1899",
    title: "Battle of Zapote Bridge",
    description: "A decisive battle between Filipino revolutionaries and Spanish forces during the Philippine Revolution.",
    image: zapoteImage,
  },
  {
    year: "November 9-11, 1896",
    title: "Battle of Binakayan",
    description: "A major Filipino victory against the Spanish, securing control over key areas in Cavite.",
    image: binakayanImage,
  },
  {
    year: "1602",
    title: "San Roque Church",
    description: "A historic church in Cavite known for its deep religious significance and Spanish-era architecture.",
    image: sanRoqueImage,
  },
  {
    year: "March 22, 1897",
    title: "Casa Tejero",
    description: "The site of the Tejeros Convention, where the First Philippine Republic was established.",
    image: casaTejeroImage,
  },
];

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fae8b4] py-16 px-6">
      <div className="container mx-auto">
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-800 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Cavite's Historical Timeline
        </motion.h1>

        {/* Timeline Container */}
        <div className="relative mt-12 flex flex-col items-center">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-500 hidden md:block"></div>

          {/* Timeline Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl relative">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0; // Alternating S-pattern layout
              const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  className={`relative flex flex-col items-center md:items-${isLeft ? "end" : "start"} text-center md:text-${isLeft ? "right" : "left"} w-full`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Year on the Horizontal Line */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 bg-[#cbbd93] text-white px-6 py-3 rounded-full font-bold text-xl font-serif shadow-lg ${
                      inView ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    } transition-all duration-500`}
                  >
                    {event.year}
                  </motion.div>

                  {/* Image Container - Zoom on Hover */}
                  <motion.div
                    className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg mt-16"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </motion.div>

                  {/* Description - Appears Below Image */}
                  <motion.div
                    className="bg-white p-6 shadow-lg rounded-lg mt-4 w-full max-w-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                  >
                    <h2 className="text-xl font-bold text-gray-900 font-serif">{event.title}</h2>
                    <p className="text-gray-700 text-sm mt-2">{event.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
