'use client';

import { motion } from 'framer-motion';
import { Landmark, Sailboat, Mountain } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#fef3c7] to-[#fde68a]">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 flex items-center justify-center">
        {/* Rotating Border Animation */}
        <motion.div
          className="absolute w-full h-full border-[3px] sm:border-[4px] md:border-[5px] border-[#8b7b4b] rounded-full border-t-transparent"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Landmark Icon with Fade-In Scale Animation */}
        <motion.div
          className="absolute flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Landmark className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-[#8b7b4b]" />
        </motion.div>
        
        {/* Floating Mountain Animation */}
        <motion.div
          className="absolute top-0 left-6 md:left-8"
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Mountain className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#4a6741]" />
        </motion.div>
        
        {/* Floating Sailboat Animation */}
        <motion.div
          className="absolute bottom-0 right-6 md:right-8"
          initial={{ x: 0 }}
          animate={{ x: [-10, 0, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sailboat className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#3a5a7c]" />
        </motion.div>
      </div>

      {/* Animated Text */}
      <motion.h2
        className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#8b7b4b] tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        CaviteVenture
      </motion.h2>
    </div>
  );
}
