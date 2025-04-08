"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, User, Tag, Info, X } from "lucide-react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

interface EventCardProps {
  event: {
    _id: string           // Now a plain string
    title: string
    date: string          // ISO date string; convert to Date in component
    location: string
    description?: string
    image?: string
    time?: string
    organizer?: string
    category?: string
    [key: string]: any    // For any additional props
  }
}

export function ComprehensiveEventCard({ event }: EventCardProps) {
  // Convert date string to Date object for display formatting
  const eventDate = new Date(event.date)

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // GSAP hover effect states and refs
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement[]>([])

  const addToDetailsRefs = (el: HTMLDivElement | null) => {
    if (el && !detailsRef.current.includes(el)) {
      detailsRef.current.push(el)
    }
  }

  // Modal functions
  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  // GSAP hover effect for the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const rect = cardRef.current.getBoundingClientRect()
    const xOffset = clientX - (rect.left + rect.width / 2)
    const yOffset = clientY - (rect.top + rect.height / 2)

    if (isHovering) {
      gsap.to(cardRef.current, {
        y: -5,
        x: xOffset * 0.03,
        rotationY: xOffset / 20,
        rotationX: -yOffset / 20,
        transformPerspective: 800,
        duration: 0.6,
        ease: "power1.out",
        boxShadow:
          "0 20px 25px -5px rgba(101, 67, 33, 0.1), 0 10px 10px -5px rgba(101, 67, 33, 0.04)",
      })
    }
  }

  // Reset card position when not hovering
  useEffect(() => {
    if (!isHovering && cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        x: 0,
        rotationY: 0,
        rotationX: 0,
        boxShadow:
          "0 4px 6px -1px rgba(101, 67, 33, 0.1), 0 2px 4px -1px rgba(101, 67, 33, 0.06)",
        duration: 0.6,
        ease: "power1.out",
      })
    }
  }, [isHovering])

  // GSAP hover effect for detail boxes in modal
  const handleDetailMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const xOffset = clientX - (rect.left + rect.width / 2)
    const yOffset = clientY - (rect.top + rect.height / 2)

    gsap.to(currentTarget, {
      x: xOffset * 0.02,
      y: yOffset * 0.02,
      rotationY: xOffset / 40,
      rotationX: -yOffset / 40,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power1.out",
      boxShadow: "0 4px 12px rgba(101, 67, 33, 0.1)",
    })
  }

  const handleDetailMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      boxShadow: "0 2px 4px rgba(101, 67, 33, 0.05)",
      duration: 0.4,
      ease: "power1.out",
    })
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      {/* Event Card */}
      <div
        ref={cardRef}
        className="bg-[#f5f0e5] rounded-xl overflow-hidden shadow-md border border-[#e6d7c3] transition-all duration-300 relative cursor-pointer"
        onClick={openModal}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-10">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#8B4513] rotate-45 origin-top-left opacity-20"></div>
        </div>

        {/* Event image */}
        <div className="relative h-48 w-full">
          {event.image ? (
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
            />
          ) : (
            <div className="w-full h-full bg-[#e6d7c3] flex items-center justify-center">
              <span className="text-[#8B4513]/60">No image</span>
            </div>
          )}

          {/* Date badge */}
          <div className="absolute top-4 right-4 bg-[#f5f0e5]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#654321] shadow-sm border border-[#e6d7c3]">
            {eventDate.toLocaleDateString()}
          </div>
        </div>

        {/* Event details */}
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2 line-clamp-1 text-[#654321]">
            {event.title}
          </h3>
          <div className="flex items-center text-[#8B4513] mb-3">
            <MapPin className="h-5 w-5 mr-1" />
            <span className="truncate">{event.location}</span>
          </div>

          {event.description && (
            <p className="text-[#8B4513]/80 line-clamp-2 mb-4">
              {event.description}
            </p>
          )}

          <div className="flex justify-end mt-2">
            <div className="text-[#8B4513] hover:text-[#654321] font-medium flex items-center gap-1 group">
              View details
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e6d7c3] via-[#8B4513]/30 to-[#e6d7c3]"></div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-[#f5f0e5] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Decorative buildings silhouette at the top */}
              <div className="absolute top-0 left-0 w-full h-8 overflow-hidden opacity-20 pointer-events-none">
                <div
                  className="w-full h-full bg-repeat-x"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
                    backgroundSize: "1000px 40px",
                  }}
                ></div>
              </div>

              {/* Modal header */}
              <div className="flex justify-between items-center p-6 border-b border-[#8B4513]/20">
                <h3 className="text-2xl font-bold text-[#654321]">{event.title}</h3>
                <button
                  onClick={closeModal}
                  className="text-[#8B4513] hover:text-[#654321] bg-[#e6d7c3] hover:bg-[#d7c3a7] rounded-full p-1.5 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Event image */}
              {event.image && (
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#654321]/50 to-transparent"></div>
                </div>
              )}

              {/* Event details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div
                    ref={addToDetailsRefs}
                    className="flex items-center bg-[#e6d7c3] px-3 py-2 rounded-lg transition-all"
                    onMouseMove={handleDetailMouseMove}
                    onMouseLeave={handleDetailMouseLeave}
                  >
                    <Calendar className="h-5 w-5 mr-2 text-[#8B4513]" />
                    <span className="text-[#654321]">{formatDate(eventDate)}</span>
                  </div>

                  <div
                    ref={addToDetailsRefs}
                    className="flex items-center bg-[#e6d7c3] px-3 py-2 rounded-lg transition-all"
                    onMouseMove={handleDetailMouseMove}
                    onMouseLeave={handleDetailMouseLeave}
                  >
                    <MapPin className="h-5 w-5 mr-2 text-[#8B4513]" />
                    <span className="text-[#654321]">{event.location}</span>
                  </div>

                  {event.time && (
                    <div
                      ref={addToDetailsRefs}
                      className="flex items-center bg-[#e6d7c3] px-3 py-2 rounded-lg transition-all"
                      onMouseMove={handleDetailMouseMove}
                      onMouseLeave={handleDetailMouseLeave}
                    >
                      <Clock className="h-5 w-5 mr-2 text-[#8B4513]" />
                      <span className="text-[#654321]">{event.time}</span>
                    </div>
                  )}

                  {event.organizer && (
                    <div
                      ref={addToDetailsRefs}
                      className="flex items-center bg-[#e6d7c3] px-3 py-2 rounded-lg transition-all"
                      onMouseMove={handleDetailMouseMove}
                      onMouseLeave={handleDetailMouseLeave}
                    >
                      <User className="h-5 w-5 mr-2 text-[#8B4513]" />
                      <span className="text-[#654321]">{event.organizer}</span>
                    </div>
                  )}

                  {event.category && (
                    <div
                      ref={addToDetailsRefs}
                      className="flex items-center bg-[#e6d7c3] px-3 py-2 rounded-lg transition-all"
                      onMouseMove={handleDetailMouseMove}
                      onMouseLeave={handleDetailMouseLeave}
                    >
                      <Tag className="h-5 w-5 mr-2 text-[#8B4513]" />
                      <span className="text-[#654321]">{event.category}</span>
                    </div>
                  )}
                </div>

                {event.description && (
                  <div
                    ref={addToDetailsRefs}
                    className="mb-6 bg-[#e6d7c3]/30 p-4 rounded-lg transition-all"
                    onMouseMove={handleDetailMouseMove}
                    onMouseLeave={handleDetailMouseLeave}
                  >
                    <h4 className="text-lg font-semibold mb-2 text-[#654321] flex items-center">
                      <Info className="h-5 w-5 mr-2 text-[#8B4513]" />
                      Description
                    </h4>
                    <p className="text-[#8B4513] whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Additional Details */}
                <div
                  ref={addToDetailsRefs}
                  className="bg-[#e6d7c3]/50 rounded-lg p-4 mt-6 transition-all"
                  onMouseMove={handleDetailMouseMove}
                  onMouseLeave={handleDetailMouseLeave}
                >
                  <h4 className="text-lg font-semibold mb-2 text-[#654321]">
                    Additional Details
                  </h4>
                  {Object.entries(event).map(([key, value]) => {
                    // Skip fields already displayed
                    if (
                      [
                        "_id",
                        "title",
                        "date",
                        "location",
                        "description",
                        "image",
                        "time",
                        "organizer",
                        "category",
                        "status",
                      ].includes(key)
                    ) {
                      return null
                    }
                    // Skip functions or complex objects
                    if (
                      typeof value === "function" ||
                      (typeof value === "object" && value !== null)
                    ) {
                      return null
                    }
                    return (
                      <div
                        key={key}
                        className="mb-2 border-b border-[#8B4513]/10 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="font-medium capitalize text-[#654321]">
                          {key}:{" "}
                        </span>
                        <span className="text-[#8B4513]">
                          {String(value)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 border-t border-[#8B4513]/20 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 bg-[#8B4513] hover:bg-[#654321] text-[#f5f0e5] rounded-lg font-medium transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
