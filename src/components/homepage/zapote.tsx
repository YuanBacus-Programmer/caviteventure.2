"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ZapoteImage from "@/assets/newassets/zapotesignupimage.png";

const Zapote = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white overflow-hidden">
      {/* Left side image */}
      <motion.div
        className="w-full lg:w-1/2 relative order-2 lg:order-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Image
          src={ZapoteImage || "/placeholder.svg"}
          alt="Battle of Zapote historical image"
          className="object-cover object-center h-full w-full"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>

      {/* Right side content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 order-1 lg:order-2">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-light italic text-[#1a1a1a] mb-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          The Battle of Zapote
        </motion.h1>

        <motion.p
          className="text-base text-[#666666] leading-relaxed mb-10 max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          The Battle of Zapote stands as a pivotal conflict in Philippine history, demonstrating the courage and
          tactical ingenuity of Filipino revolutionaries. This significant engagement against colonial forces helped
          shape the nation's path to independence and remains an enduring testament to the Filipino spirit.
        </motion.p>

        <motion.div
          className="flex items-center text-[#666666] font-medium group w-fit cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link href="/homepage/zapote">
            <div className="flex items-center">
              <span className="mr-2 uppercase text-sm tracking-wider">
                More About
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Zapote;
