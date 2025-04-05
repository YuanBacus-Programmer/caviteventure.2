"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CasaDeTajeros from "@/assets/newassets/casadetajero.png"
import { gsap } from "gsap"

const CasaDeTajero: React.FC = () => {
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
      <h3 className="uppercase font-general text-xs pt-10 text-[#666666]">Architectural Heritage</h3>
      <h1 className="plain-heading special-font md:text-[8rem] text-5xl max-w-5xl md:leading-[7rem] text-[#1a1a1a] font-light italic">
        C<b>a</b>sa De T<b>a</b>jero
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left */}
        <div className="flex flex-col w-full gap-10 items-end mt-10">
          <div
            ref={addToRefs}
            className="flex flex-col border border-neutral-200 bg-[#f9f9f9] rounded-lg overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={CasaDeTajeros || "/placeholder.svg"}
                alt="Casa De Tajero historical view"
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-5">
              <h3 className="text-[#666666] text-start font-medium">Historical Landmark</h3>
              <h1 className="plain-heading special-font text-[#1a1a1a] text-3xl md:text-5xl font-light italic">
                Capt<b>i</b>vating Her<b>i</b>tage
              </h1>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="flex border flex-col justify-between md:h-[20rem] border-neutral-200 p-5 bg-[#f5f5f5] rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[4rem] md:text-[6rem] leading-none font-light italic">
              Est<b>.</b> 18<b>70</b>
            </h1>
            <div className="p-5">
              <h3 className="text-[#666666] text-end font-medium">Year of Construction</h3>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col w-full gap-10 items-start">
          <div
            ref={addToRefs}
            className="flex flex-col border border-neutral-200 bg-[#f9f9f9] rounded-lg p-5"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="p-2">
              <h3 className="text-[#666666] text-start font-medium">Cultural Significance</h3>
            </div>
            <p className="text-base text-[#666666] leading-relaxed mb-6 max-w-lg">
              Casa De Tajero is a captivating historical landmark that encapsulates the rich cultural heritage of the
              region. With its unique architecture and storied past, this site continues to inspire visitors and
              preserve its legacy.
            </p>
            <Link href="/homepage/casadetajero">
              <div className="flex items-center text-[#666666] font-medium group w-fit cursor-pointer">
                <span className="mr-2 uppercase text-sm tracking-wider">More About</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </Link>
          </div>

          <div
            ref={addToRefs}
            className="p-5 border flex flex-col rounded-lg border-neutral-200"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[3rem] md:text-[4rem] max-w-sm leading-none text-start font-light italic">
              Arch<b>i</b>tectural
              <br />
              Fe<b>a</b>tures
            </h1>
            <p className="text-end font-general uppercase text-xs pt-10 text-[#666666]">
              Colonial design
              <br />
              Ornate woodwork
              <br />
              Stone foundations
              <br />
              Period furnishings
              <br />
              Courtyard layout
              <br />
              Historical artifacts
            </p>
          </div>

          <div
            ref={addToRefs}
            className="bg-[#f5f5f5] rounded-lg relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="p-5 z-10 relative">
              <div className="p-2">
                <h3 className="text-[#666666] text-start font-medium">
                  Preservation
                  <br />
                  efforts
                </h3>
              </div>
              <h1 className="plain-heading special-font text-[#1a1a1a] text-[3rem] px-4 md:text-[5rem] leading-none md:leading-[5rem] text-start font-light italic">
                Liv<b>i</b>ng
                <br />
                Hist<b>o</b>ry
              </h1>
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
              <Image
                src={CasaDeTajeros || "/placeholder.svg"}
                alt="Casa De Tajero detail"
                className="object-cover object-bottom opacity-30"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CasaDeTajero

