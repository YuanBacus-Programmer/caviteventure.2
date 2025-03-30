"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Zapote from "@/assets/heroimages/cog.png";
import SanRoque from "@/assets/heroimages/cylinder.png";
import Binakayan from "@/assets/heroimages/noodle.png";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BinakayanPage from "@/components/homepage/binakayan";
import ZapotePage from "@/components/homepage/zapote";

export default function ClientHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slides = [
    {
      image: Zapote,
      name: "Zapote",
      date: "January 15, 2022",
      alt: "Zapote image",
    },
    {
      image: SanRoque,
      name: "San Roque",
      date: "March 8, 2021",
      alt: "San Roque image",
    },
    {
      image: Binakayan,
      name: "Binakayan",
      date: "November 30, 2020",
      alt: "Binakayan image",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Carousel slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : index < currentSlide ||
                  (currentSlide === 0 && index === slides.length - 1)
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Image with overlay */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className={`object-cover transition-transform duration-1500 ${
                  currentSlide === index ? "scale-105 animate-slow-zoom" : ""
                }`}
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content with animations */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <p
                className={`text-sm md:text-base opacity-80 mb-2 transition-all duration-1000 delay-300 ${
                  currentSlide === index
                    ? "translate-y-0 opacity-80"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {slide.date}
              </p>
              <h2
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 transition-all duration-1000 delay-500 ${
                  currentSlide === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {slide.name}
              </h2>
              <Button
                variant="outline"
                className={`bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-1000 delay-700 ${
                  currentSlide === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                READ MORE
              </Button>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-4" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* BinakayanPage component below the carousel */}
      <div className="mt-8">
        <BinakayanPage />
      </div>
      <div className="mt-8">
        <ZapotePage />
      </div>
    </>
  );
}
