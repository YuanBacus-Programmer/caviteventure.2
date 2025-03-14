"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Importing optimized WebP images for better performance
import avatar1 from "@/assets/testimonialsimages/avatar-1.png";
import avatar2 from "@/assets/testimonialsimages/avatar-2.png";
import avatar3 from "@/assets/testimonialsimages/avatar-3.png";
import avatar4 from "@/assets/testimonialsimages/avatar-4.png";
import avatar5 from "@/assets/testimonialsimages/avatar-5.png";
import avatar6 from "@/assets/testimonialsimages/avatar-6.png";
import avatar7 from "@/assets/testimonialsimages/avatar-7.png";
import avatar8 from "@/assets/testimonialsimages/avatar-8.png";
import avatar9 from "@/assets/testimonialsimages/avatar-9.png";

const testimonials = [
  { text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.", imageSrc: avatar1, name: "Jamie Rivera", username: "@jamietechguru00" },
  { text: "Our team's productivity has skyrocketed since we started using this tool.", imageSrc: avatar2, name: "Josh Smith", username: "@jjsmith" },
  { text: "This app has completely transformed how I manage my projects and deadlines.", imageSrc: avatar3, name: "Morgan Lee", username: "@morganleewhiz" },
  { text: "I was amazed at how quickly we were able to integrate this app into our workflow.", imageSrc: avatar4, name: "Casey Jordan", username: "@caseyj" },
  { text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.", imageSrc: avatar5, name: "Taylor Kim", username: "@taylorkimm" },
  { text: "The customizability and integration capabilities of this app are top-notch.", imageSrc: avatar6, name: "Riley Smith", username: "@rileysmith1" },
  { text: "Adopting this app for our team has streamlined our project management and improved communication across the board.", imageSrc: avatar7, name: "Jordan Patels", username: "@jpatelsdesign" },
  { text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.", imageSrc: avatar8, name: "Sam Dawson", username: "@dawsontechtips" },
  { text: "Its user-friendly interface and robust features support our diverse needs.", imageSrc: avatar9, name: "Casey Harper", username: "@casey09" },
];

const columns = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#f7f7f7] min-h-screen flex items-center justify-center py-20">
      <div className="container px-6 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div className="text-center">
          <motion.div
            className="tag text-lg font-medium text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Testimonials
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-b from-black to-[#cbbd93] text-transparent bg-clip-text mt-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Users&apos; Response
          </motion.h2>

          <motion.p
            className="mt-4 text-md sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            From <strong>intuitive design</strong> to <strong>powerful features</strong>, our app has become an essential tool for users worldwide.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial="hidden"
          animate="visible"
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-8">
              {column.map(({ text, imageSrc, name, username }, cardIndex) => (
                <motion.div
                  key={cardIndex}
                  className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-500 hover:scale-105 border border-gray-200"
                  variants={cardVariants}
                  custom={cardIndex}
                >
                  <p className="text-gray-700">{text}</p>
                  <div className="flex items-center gap-3 mt-5">
                    <Image
                      src={imageSrc}
                      alt={name}
                      height={50}
                      width={50}
                      className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
                      sizes="(max-width: 768px) 50px, (max-width: 1200px) 50px, 50px"
                      priority={false}
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-800">{name}</div>
                      <div className="text-gray-600 text-sm">{username}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
