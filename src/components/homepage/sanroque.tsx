"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SanRoqueImage from "@/assets/newassets/sanroque.png"
import { gsap } from "gsap"

const SanRoque: React.FC = () => {
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
        x: xOffset * 0.1,
        y: yOffset * 0.1,
        rotationY: xOffset / 15,
        rotationX: -yOffset / 15,
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

  return (
    <section className="min-h-screen bg-white text-[#1a1a1a] p-5 md:p-10 space-y-10">
      <h3 className="uppercase font-general text-xs pt-10 text-[#666666]">Cultural Heritage</h3>
      <h1 className="plain-heading md:text-[8rem] text-5xl max-w-5xl md:leading-[7rem] text-[#1a1a1a] font-light italic">
        S<b>a</b>n Roq<b>u</b>e Legacy
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left */}
        <div className="flex flex-col w-full gap-10 items-end mt-10">
          <div
            ref={addToRefs}
            className="flex flex-col border border-neutral-200 bg-[#f9f9f9] rounded-lg p-5"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="p-2">
              <h3 className="text-[#666666] text-start font-medium">Historical Significance</h3>
            </div>
            <p className="text-base text-[#666666] leading-relaxed mb-6 max-w-lg">
              Discover the rich history and cultural significance of San Roque. From its architectural marvels to the
              storied past that continues to inspire generations, San Roque remains a beacon of historical legacy.
            </p>
            <Link href="/homepage/sanroque">
              <div className="flex items-center text-[#666666] font-medium group w-fit cursor-pointer">
                <span className="mr-2 uppercase text-sm tracking-wider">More About</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </Link>
          </div>

          <div
            ref={addToRefs}
            className="flex border flex-col justify-between md:h-[20rem] border-neutral-200 p-5 bg-[#f5f5f5] rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[5rem] md:text-[8rem] leading-none font-light italic">
              Cult<b>u</b>ral
              <br />
              Her<b>i</b>tage
            </h1>
            <div className="p-5">
              <h3 className="text-[#666666] text-end font-medium">Preserving Traditions</h3>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col w-full gap-10 items-start">
          <div
            ref={addToRefs}
            className="flex flex-col border border-neutral-200 bg-[#f9f9f9] rounded-lg overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={SanRoqueImage || "/placeholder.svg"}
                alt="San Roque historical view"
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-5">
              <h3 className="text-[#666666] text-start font-medium">Architectural Marvel</h3>
              <h1 className="plain-heading special-font text-[#1a1a1a] text-3xl md:text-5xl font-light italic">
                Tim<b>e</b>less Be<b>a</b>uty
              </h1>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="p-5 border flex flex-col rounded-lg border-neutral-200"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[3rem] md:text-[4.5rem] max-w-sm leading-none text-start font-light italic">
              Hist<b>o</b>rical
              <br />
              Elem<b>e</b>nts
            </h1>
            <p className="text-end font-general uppercase text-xs pt-10 text-[#666666]">
              Colonial architecture
              <br />
              Religious significance
              <br />
              Community gatherings
              <br />
              Traditional festivals
              <br />
              Historical landmarks
              <br />
              Cultural preservation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SanRoque

