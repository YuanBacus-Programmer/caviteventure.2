"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { gsap } from "gsap"
import Binakayan from "@/assets/newassets/1.png"
import Zapote from "@/assets/newassets/2.png"
import CasaDeTajeris from "@/assets/newassets/3.png"
import SanRoqueChurch from "@/assets/newassets/4.png"

const CenterAbout = () => {
  // State for modal/lightbox
  const [selectedImage, setSelectedImage] = useState<null | {
    src: any
    alt: string
    title: string
    description: string
    year: string
  }>(null)

  // GSAP hover effect states and refs
  const [isHovering, setIsHovering] = useState(false)
  const cardRefs = useRef<HTMLDivElement[]>([])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event
    const rect = currentTarget.getBoundingClientRect()

    const xOffset = clientX - (rect.left + rect.width / 2)
    const yOffset = clientY - (rect.top + rect.height / 2)

    if (isHovering) {
      gsap.to(currentTarget, {
        x: xOffset * 0.05,
        y: yOffset * 0.05,
        rotationY: xOffset / 20,
        rotationX: -yOffset / 20,
        transformPerspective: 600,
        duration: 0.6,
        ease: "power1.out",
      })
    }
  }

  useEffect(() => {
    if (!isHovering) {
      cardRefs.current.forEach((card) => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power1.out",
        })
      })
    }
  }, [isHovering])

  // Historical places data with detailed descriptions
  const historicalPlaces = [
    {
      image: Binakayan,
      alt: "Binakayan",
      title: "Battle of Binakayan",
      year: "November 9-11, 1896",
      description:
        "The Battle of Binakayan was a decisive Filipino victory during the Philippine Revolution against Spanish colonial rule. Led by Emilio Aguinaldo and Artemio Ricarte, Filipino revolutionary forces successfully defended their positions in Binakayan and Dalahican against Spanish attacks. This victory boosted Filipino morale and demonstrated their military capabilities. The battle is considered one of the most significant early victories of the revolution, as it secured Filipino control over key areas in Cavite province and forced Spanish troops to retreat to Manila. Today, the site stands as a testament to Filipino courage and determination in their fight for independence.",
    },
    {
      image: Zapote,
      alt: "Zapote",
      title: "Battle of Zapote Bridge",
      year: "June 13, 1899",
      description:
        "The Battle of Zapote Bridge was a major engagement during the Philippine-American War. Filipino forces under General Antonio Luna made their stand at Zapote Bridge against advancing American troops. Despite being outgunned, the Filipino soldiers fought bravely, inflicting significant casualties on the American forces before eventually withdrawing. The battle demonstrated the determination of Filipino forces to resist American occupation. The historic Zapote Bridge spans the Zapote River, connecting Las Piñas in Metro Manila with Bacoor in Cavite. The site remains an important landmark in Philippine history, symbolizing the Filipino struggle for sovereignty and independence against colonial powers.",
    },
    {
      image: CasaDeTajeris,
      alt: "Casa de Tajeris",
      title: "Casa Tejero",
      year: "March 22, 1897",
      description:
        "Casa Tejero in Cavite was the site of the historic Tejeros Convention, a significant event in Philippine history. On March 22, 1897, revolutionary leaders gathered here to establish the first Philippine Republic and elect its officers. This convention marked a crucial transition from the Katipunan revolutionary society to a formal government structure. Emilio Aguinaldo was elected as President, while Andrés Bonifacio, the founder of the Katipunan, was elected as Director of the Interior. However, his qualifications were questioned, leading to a dramatic split in the revolutionary movement. The historic building represents a pivotal moment in the birth of Philippine democracy and the complex path to independence.",
    },
    {
      image: SanRoqueChurch,
      alt: "San Roque Church",
      title: "San Roque Church",
      year: "Established 1602",
      description:
        "San Roque Church in Cavite is one of the oldest churches in the Philippines, with its origins dating back to 1602. Named after Saint Roch (San Roque), the patron saint of the sick, the church has stood as a spiritual beacon for centuries. The church features Spanish colonial architecture with thick stone walls, buttresses, and ornate religious artwork. Throughout its history, San Roque Church has survived wars, natural disasters, and the passage of time, becoming not just a place of worship but a living museum of Filipino faith and resilience. The church continues to serve the community today, hosting religious ceremonies and standing as a testament to Cavite's rich cultural and religious heritage.",
    },
  ]

  // Open image in modal/lightbox
  const openImage = (place: {
    image: any
    alt: string
    title: string
    description: string
    year: string
  }) => {
    setSelectedImage({
      src: place.image,
      alt: place.alt,
      title: place.title,
      description: place.description,
      year: place.year,
    })
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Close modal/lightbox
  const closeImage = () => {
    setSelectedImage(null)
    // Re-enable body scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f5f0e5] relative">
      {/* Decorative buildings silhouette at the top */}
      <div className="absolute top-0 left-0 w-full h-12 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          className="text-4xl font-bold text-[#654321] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Historical Places
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {historicalPlaces.map((place, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="relative cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => openImage(place)}
            >
              <div className="relative w-full h-[350px] overflow-hidden rounded-lg shadow-md border-2 border-[#8B4513]/20 bg-[#f9f9f9]">
                <div className="relative h-[250px] w-full overflow-hidden">
                  <Image
                    src={place.image || "/placeholder.svg"}
                    alt={place.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-[#654321] font-bold text-xl">{place.title}</h3>
                  <p className="text-[#8B4513] text-sm mt-1">{place.year}</p>
                  <div className="mt-2 flex justify-end">
                    <span className="text-[#8B4513]/70 text-sm italic">Click to learn more</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#654321]/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal/Lightbox with Side-by-Side Layout */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <motion.div
              className="relative max-w-7xl w-full bg-[#f5f0e5] rounded-lg overflow-hidden shadow-2xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal content
            >
              {/* Modal header with title and close button */}
              <div className="flex items-center justify-between p-4 border-b border-[#8B4513]/20 bg-[#654321]">
                <h3 className="text-xl font-bold text-[#f5f0e5]">{selectedImage.title}</h3>
                <motion.button
                  className="p-1 rounded-full bg-[#f5f0e5]/20 text-[#f5f0e5] hover:bg-[#f5f0e5]/30 transition-colors"
                  onClick={closeImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close image"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Side-by-side layout container */}
              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-hidden">
                {/* Left side - Image (now bigger) */}
                <div className="w-full lg:w-3/5 relative h-[400px] sm:h-[500px] lg:h-[600px] bg-[#654321]/10">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                    className="p-4"
                  />
                </div>

                {/* Right side - Description */}
                <div className="w-full lg:w-2/5 p-6 flex flex-col overflow-y-auto">
                  <div className="mb-2 inline-block bg-[#8B4513]/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-[#8B4513]">{selectedImage.year}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#654321] mb-4">{selectedImage.title}</h4>
                  <p className="text-[#8B4513] text-justify leading-relaxed">{selectedImage.description}</p>

                  {/* Decorative element */}
                  <div className="mt-6 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>

                  {/* Call to action */}
                  <div className="mt-4 text-center">
                    <p className="text-[#654321] text-sm italic">
                      Visit this historical site to experience Cavite's rich heritage
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative buildings silhouette at the bottom of modal */}
              <div className="relative w-full h-8 overflow-hidden opacity-20">
                <div
                  className="w-full h-full bg-repeat-x"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,0 L25,0 L25,20 L35,20 L35,30 L45,30 L45,20 L55,20 L55,0 L75,0 L75,15 L85,15 L85,25 L95,25 L95,15 L105,15 L105,0 L125,0 L125,25 L135,25 L135,35 L145,35 L145,25 L155,25 L155,0 L175,0 L175,20 L185,20 L185,30 L195,30 L195,20 L205,20 L205,0 L225,0 L225,15 L235,15 L235,25 L245,25 L245,15 L255,15 L255,0 L275,0 L275,25 L285,25 L285,35 L295,35 L295,25 L305,25 L305,0 L325,0 L325,20 L335,20 L335,30 L345,30 L345,20 L355,20 L355,0 L375,0 L375,15 L385,15 L385,25 L395,25 L395,15 L405,15 L405,0 L425,0 L425,25 L435,25 L435,35 L445,35 L445,25 L455,25 L455,0 L475,0 L475,20 L485,20 L485,30 L495,30 L495,20 L505,20 L505,0 L525,0 L525,15 L535,15 L535,25 L545,25 L545,15 L555,15 L555,0 L575,0 L575,25 L585,25 L585,35 L595,35 L595,25 L605,25 L605,0 L625,0 L625,20 L635,20 L635,30 L645,30 L645,20 L655,20 L655,0 L675,0 L675,15 L685,15 L685,25 L695,25 L695,15 L705,15 L705,0 L725,0 L725,25 L735,25 L735,35 L745,35 L745,25 L755,25 L755,0 L775,0 L775,20 L785,20 L785,30 L795,30 L795,20 L805,20 L805,0 L825,0 L825,15 L835,15 L835,25 L845,25 L845,15 L855,15 L855,0 L875,0 L875,25 L885,25 L885,35 L895,35 L895,25 L905,25 L905,0 L925,0 L925,20 L935,20 L935,30 L945,30 L945,20 L955,20 L955,0 L975,0 L975,15 L985,15 L985,25 L995,25 L995,15 L1000,15 L1000,0 Z'/%3E%3C/svg%3E")`,
                    backgroundSize: "1000px 40px",
                  }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative buildings silhouette at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,0 L25,0 L25,20 L35,20 L35,30 L45,30 L45,20 L55,20 L55,0 L75,0 L75,15 L85,15 L85,25 L95,25 L95,15 L105,15 L105,0 L125,0 L125,25 L135,25 L135,35 L145,35 L145,25 L155,25 L155,0 L175,0 L175,20 L185,20 L185,30 L195,30 L195,20 L205,20 L205,0 L225,0 L225,15 L235,15 L235,25 L245,25 L245,15 L255,15 L255,0 L275,0 L275,25 L285,25 L285,35 L295,35 L295,25 L305,25 L305,0 L325,0 L325,20 L335,20 L335,30 L345,30 L345,20 L355,20 L355,0 L375,0 L375,15 L385,15 L385,25 L395,25 L395,15 L405,15 L405,0 L425,0 L425,25 L435,25 L435,35 L445,35 L445,25 L455,25 L455,0 L475,0 L475,20 L485,20 L485,30 L495,30 L495,20 L505,20 L505,0 L525,0 L525,15 L535,15 L535,25 L545,25 L545,15 L555,15 L555,0 L575,0 L575,25 L585,25 L585,35 L595,35 L595,25 L605,25 L605,0 L625,0 L625,20 L635,20 L635,30 L645,30 L645,20 L655,20 L655,0 L675,0 L675,15 L685,15 L685,25 L695,25 L695,15 L705,15 L705,0 L725,0 L725,25 L735,25 L735,35 L745,35 L745,25 L755,25 L755,0 L775,0 L775,20 L785,20 L785,30 L795,30 L795,20 L805,20 L805,0 L825,0 L825,15 L835,15 L835,25 L845,25 L845,15 L855,15 L855,0 L875,0 L875,25 L885,25 L885,35 L895,35 L895,25 L905,25 L905,0 L925,0 L925,20 L935,20 L935,30 L945,30 L945,20 L955,20 L955,0 L975,0 L975,15 L985,15 L985,25 L995,25 L995,15 L1000,15 L1000,0 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
            transform: "rotate(180deg)",
          }}
        ></div>
      </div>
    </div>
  )
}

export default CenterAbout

