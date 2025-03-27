"use client";

import { useState } from "react";
import DynamicFrameLayout from "@/components/dynamic/DynamicFrameLayout"; // Default import
import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts";
import Link from "next/link";

export default function ClientHome() {
  const [headerSize] = useState(1.2); // 120% is the default size
  const [textSize] = useState(0.8); // 80% is the default size

  return (
    <div
      className={`min-h-screen bg-white flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content - Sand Background */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full bg-[#F4E1C1] p-4 rounded-md">
          <div className="flex flex-col gap-16">
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-gray-900 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Cavite
              <br />
              Venture
              <br />
            </h1>
            <div
              className={`${inter.className} flex flex-col gap-12 text-gray-700 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-gray-300 w-full" />
                <p>
                  Join Caviteventure on a creative odyssey! We're seeking a visionary Brand Designer who dares to redefine what a brand can be. At Caviteventure, you'll transform ideas into striking visual stories that captivate audiences across every touchpoint—from immersive product designs and dynamic social media experiences to bold marketing campaigns. Collaborate with a passionate, forward-thinking team, harness cutting-edge insights, and let your creativity pave the way for a brand that's not just seen, but truly felt. If you're ready to push boundaries and be at the forefront of a revolutionary brand adventure, your journey starts here.
                </p>
                <p>
                  At Caviteventure, you'll blend graphic, motion, and web design with expert video production and editing, harnessing both time-honored techniques and groundbreaking tools to craft visuals that captivate, inspire, and leave a lasting impact.
                </p>
                <p>Here are some of our favorite works so far.</p>
                <div className="h-px bg-gray-300 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - White Background */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh] bg-white p-4 rounded-md">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
  );
}
