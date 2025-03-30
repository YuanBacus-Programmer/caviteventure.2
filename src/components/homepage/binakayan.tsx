"use client"

import Image from "next/image"
import BinakayanImage from "@/assets/newassets/binakayansketch.png"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const Binakayan = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white overflow-hidden">
      {/* Left side content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-light italic text-[#1a1a1a] mb-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          The Battle of Binakayan
        </motion.h1>

        <motion.p
          className="text-base text-[#666666] leading-relaxed mb-10 max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          The Battle of Binakayan marks a significant moment in Philippine history, showcasing the resilience and
          strategic brilliance of Filipino forces. This historical event represents one of the most decisive victories
          against colonial powers and continues to be celebrated as a symbol of national pride.
        </motion.p>

        <motion.div
          className="flex items-center text-[#666666] font-medium group w-fit"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="mr-2 uppercase text-sm tracking-wider">More About</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
        </motion.div>
      </div>

      {/* Right side image */}
      <motion.div
        className="w-full lg:w-1/2 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Image
          src={BinakayanImage || "/placeholder.svg"}
          alt="Binakayan historical sketch"
          className="object-cover object-center h-full w-full"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>
    </div>
  )
}

export default Binakayan
