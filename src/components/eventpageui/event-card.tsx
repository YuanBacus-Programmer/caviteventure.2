"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { EventModal } from "@/components/eventpageui/event-modal"

interface EventCardProps {
  event: {
    _id: { toString: () => string }
    title: string
    date: Date       // <-- Now typed as Date instead of string
    location: string
    description?: string
    image?: string
    [key: string]: any // For any additional props
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <motion.div
      className="bg-[#f5f0e5] rounded-xl overflow-hidden shadow-md border border-[#e6d7c3] hover:shadow-xl transition-all duration-300 relative"
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(101, 67, 33, 0.1), 0 10px 10px -5px rgba(101, 67, 33, 0.04)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
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

        {/* Format the Date to display */}
        <div className="absolute top-4 right-4 bg-[#f5f0e5]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#654321] shadow-sm border border-[#e6d7c3]">
          {event.date.toLocaleDateString()}
        </div>
      </div>

      {/* Event details */}
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2 line-clamp-1 text-[#654321]">{event.title}</h3>
        <div className="flex items-center text-[#8B4513] mb-3">
          <MapPin className="h-5 w-5 mr-1" />
          <span className="truncate">{event.location}</span>
        </div>

        {event.description && <p className="text-[#8B4513]/80 line-clamp-2 mb-4">{event.description}</p>}

        <div className="flex justify-end mt-2">
          <EventModal event={event} />
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#e6d7c3] via-[#8B4513]/30 to-[#e6d7c3]"></div>
    </motion.div>
  )
}
