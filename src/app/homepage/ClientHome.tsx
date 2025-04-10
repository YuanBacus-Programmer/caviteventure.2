"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Zapote from "@/assets/heroimages/cog.png"
import SanRoque from "@/assets/heroimages/cylinder.png"
import Binakayan from "@/assets/heroimages/noodle.png"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

// Import your pages
import BinakayanPage from "@/components/homepage/binakayan"
import ZapotePage from "@/components/homepage/zapote"
import SanRoquePage from "@/components/homepage/sanroque"
import CasaDetajeroPage from "@/components/homepage/casadetajero"

export default function ClientHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  const slides = [
    {
      image: Zapote,
      name: "Binakayan",
      date: "November 9–11, 1896",
      alt: "Zapote image",
    },
    {
      image: SanRoque,
      name: "Zapote Bridge",
      date: "built in 1817",
      alt: "San Roque image",
    },
    {
      image: Binakayan,
      name: "san roque church",
      date: "1573",
      alt: "Binakayan image",
    },
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -----------------------------
  // FAQ Section Implementation
  // -----------------------------
  const faqs = [
    {
      question: "What historical sites can I visit in Cavite?",
      answer:
        "Cavite is home to numerous historical sites including Aguinaldo Shrine, Corregidor Island, Battle of Binakayan Monument, Zapote Bridge, San Roque Church, and Casa de Tajero among others. Each site offers a unique glimpse into Philippine history and culture.",
    },
    {
      question: "What is the best time to visit Cavite?",
      answer:
        "The best time to visit Cavite is during the dry season from November to May. This period offers pleasant weather for exploring outdoor historical sites and attending local festivals. December to February are particularly comfortable with cooler temperatures.",
    },
    {
      question: "Are there guided tours available for historical sites?",
      answer:
        "Yes, there are several guided tour options available. Many historical sites offer on-site guides, and there are also tour companies that provide comprehensive historical tours of Cavite. These guided experiences enhance your understanding of the rich history and cultural significance of each location.",
    },
    {
      question: "What local delicacies should I try in Cavite?",
      answer:
        "Cavite is known for several delicacies including Kakanin (rice cakes), Bibingkoy (glutinous rice balls), Pancit Pusit (squid noodles), Bacalao (salted cod dish), and Sampayna (local bread). Don't miss trying these authentic local foods during your visit to get a taste of Cavite's culinary heritage.",
    },
    {
      question: "How can I get around Cavite to visit multiple sites?",
      answer:
        "You can get around Cavite using public transportation like jeepneys and buses for budget travel. For more convenience, tricycles are good for short distances within towns. Renting a car or hiring a driver for the day is recommended if you plan to visit multiple sites across different municipalities in one day.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* --------------- Carousel --------------- */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Carousel slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : index < currentSlide || (currentSlide === 0 && index === slides.length - 1)
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Image with overlay */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                className={`object-cover transition-transform duration-1500 ${
                  currentSlide === index ? "scale-105 animate-slow-zoom" : ""
                }`}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#654321]/60 to-[#654321]/80" />
            </div>

            {/* Content with animations */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f5f0e5] px-4">
              <p
                className={`text-sm md:text-base opacity-80 mb-2 transition-all duration-1000 delay-300 ${
                  currentSlide === index ? "translate-y-0 opacity-80" : "translate-y-10 opacity-0"
                }`}
              >
                {slide.date}
              </p>
              <h2
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 transition-all duration-1000 delay-500 ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                {slide.name}
              </h2>
              {/* Removed the "READ MORE" button */}
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#654321]/50 hover:bg-[#654321]/70 text-[#f5f0e5] p-2 rounded-full transition-all"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#654321]/50 hover:bg-[#654321]/70 text-[#f5f0e5] p-2 rounded-full transition-all"
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Dots navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-[#f5f0e5] w-4" : "bg-[#f5f0e5]/50 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* --------------- Pages Below --------------- */}
      <div className="mt-8">
        <BinakayanPage />
      </div>
      <div className="mt-8">
        <ZapotePage />
      </div>
      <div className="mt-8">
        <SanRoquePage />
      </div>
      <div className="mt-8">
        <CasaDetajeroPage />
      </div>

      {/* --------------- FAQ Section --------------- */}
      <div className="bg-[#654321] text-[#f5f0e5] py-12 px-4 relative">
        {/* Decorative buildings silhouette at the top */}
        <div className="absolute top-0 left-0 w-full h-8 overflow-hidden opacity-20 pointer-events-none">
          <div
            className="w-full h-full bg-repeat-x"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23f5f0e5'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
              backgroundSize: "1000px 40px",
            }}
          ></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-[#e6d7c3] mb-8">
            Find answers to common questions about visiting Cavite&apos;s historical sites.
          </p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-b border-[#8B4513] pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button className="w-full text-left flex justify-between items-center" onClick={() => toggleFAQ(i)}>
                  <span className="text-lg md:text-xl font-medium">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="ml-2 text-[#e6d7c3]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-[#e6d7c3] text-base leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative buildings silhouette at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden opacity-20 pointer-events-none">
          <div
            className="w-full h-full bg-repeat-x"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23f5f0e5'%3E%3Cpath d='M0,0 L25,0 L25,20 L35,20 L35,30 L45,30 L45,20 L55,20 L55,0 L75,0 L75,15 L85,15 L85,25 L95,25 L95,15 L105,15 L105,0 L125,0 L125,25 L135,25 L135,35 L145,35 L145,25 L155,25 L155,0 L175,0 L175,20 L185,20 L185,30 L195,30 L195,20 L205,20 L205,0 L225,0 L225,15 L235,15 L235,25 L245,25 L245,15 L255,15 L255,0 L275,0 L275,25 L285,25 L285,35 L295,35 L295,25 L305,25 L305,0 L325,0 L325,20 L335,20 L335,30 L345,30 L345,20 L355,20 L355,0 L375,0 L375,15 L385,15 L385,25 L395,25 L395,15 L405,15 L405,0 L425,0 L425,25 L435,25 L435,35 L445,35 L445,25 L455,25 L455,0 L475,0 L475,20 L485,20 L485,30 L495,30 L495,20 L505,20 L505,0 L525,0 L525,15 L535,15 L535,25 L545,25 L545,15 L555,15 L555,0 L575,0 L575,25 L585,25 L585,35 L595,35 L595,25 L605,25 L605,0 L625,0 L625,20 L635,20 L635,30 L645,30 L645,20 L655,20 L655,0 L675,0 L675,15 L685,15 L685,25 L695,25 L695,15 L705,15 L705,0 L725,0 L725,25 L735,25 L735,35 L745,35 L745,25 L755,25 L755,0 L775,0 L775,20 L785,20 L785,30 L795,30 L795,20 L805,20 L805,0 L825,0 L825,15 L835,15 L835,25 L845,25 L845,15 L855,15 L855,0 L875,0 L875,25 L885,25 L885,35 L895,35 L895,25 L905,25 L905,0 L925,0 L925,20 L935,20 L935,30 L945,30 L945,20 L955,20 L955,0 L975,0 L975,15 L985,15 L985,25 L995,25 L995,15 L1000,15 L1000,0 Z'/%3E%3C/svg%3E")`,
              backgroundSize: "1000px 40px",
              transform: "rotate(180deg)",
            }}
          ></div>
        </div>
      </div>
    </>
  )
}
