"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ZapoteImage from "@/assets/newassets/zapotesignupimage.png"
import { gsap } from "gsap"

const Zapote: React.FC = () => {
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
      <h3 className="uppercase font-general text-xs pt-10 text-[#666666]">Historical Significance</h3>
      <h1 className="plain-heading md:text-[8rem] text-5xl max-w-5xl md:leading-[7rem] text-[#1a1a1a] font-light italic">
        The B<b>a</b>ttle of Z<b>a</b>pote
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left side - Maintaining the image prominence on this side */}
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
                src={ZapoteImage || "/placeholder.svg"}
                alt="Battle of Zapote historical image"
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-5">
              <h3 className="text-[#666666] text-start font-medium">Pivotal Conflict</h3>
              <h1 className="plain-heading special-font text-[#1a1a1a] text-3xl md:text-5xl font-light italic">
                Shap<b>i</b>ng Ind<b>e</b>pendence
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
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[5rem] md:text-[10rem] leading-none font-light italic">
              18<b>97</b>
            </h1>
            <div className="p-5">
              <h3 className="text-[#666666] text-end font-medium">Year of the Battle</h3>
            </div>
          </div>
        </div>

        {/* Right side - Content cards */}
        <div className="flex flex-col w-full gap-10 items-start">
          <div
            ref={addToRefs}
            className="flex flex-col border border-neutral-200 bg-[#f9f9f9] rounded-lg p-5"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="p-2">
              <h3 className="text-[#666666] text-start font-medium">Historical Context</h3>
            </div>
            <p className="text-base text-[#666666] leading-relaxed mb-6 max-w-lg">
              The Battle of Zapote stands as a pivotal conflict in Philippine history, demonstrating the courage and
              tactical ingenuity of Filipino revolutionaries. This significant engagement against colonial forces helped
              shape the nation's path to independence and remains an enduring testament to the Filipino spirit.
            </p>
            <Link href="/homepage/zapote">
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
            <h1 className="plain-heading special-font text-[#1a1a1a] text-[3rem] md:text-[4.5rem] max-w-sm leading-none text-start font-light italic">
              Rev<b>o</b>lutionary C<b>o</b>urage
            </h1>
            <p className="text-end font-general uppercase text-xs pt-10 text-[#666666]">
              Tactical ingenuity
              <br />
              Strategic positioning
              <br />
              Resourceful defense
              <br />
              Coordinated attacks
              <br />
              Local knowledge
              <br />
              Patriotic determination
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
                  Legacy of
                  <br />
                  the battle
                </h3>
              </div>
              <h1 className="plain-heading special-font text-[#1a1a1a] text-[3rem] px-4 md:text-[5rem] leading-none md:leading-[5rem] text-start font-light italic">
                End<b>u</b>ring
                <br />
                Test<b>a</b>ment
              </h1>
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
              <Image
                src={ZapoteImage || "/placeholder.svg"}
                alt="Battle of Zapote historical image"
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

export default Zapote

