"use client"

import { useRef, useEffect, useState } from "react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use a new variable that TypeScript now infers is non-null
    const canvasElement = canvas

    const ctx = canvasElement.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvasElement.width = window.innerWidth
      canvasElement.height = window.innerHeight
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      isUp: boolean
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvasElement) return 0

      ctx.fillStyle = "white"
      ctx.save()

      const logoHeight = isMobile ? 60 : 120
      const signLogoWidth = logoHeight * 2.5 // Width for SIGN logo
      const upLogoWidth = logoHeight * 1.5 // Width for UP logo
      const logoSpacing = isMobile ? 30 : 60 // Spacing between logos
      const totalWidth = signLogoWidth + upLogoWidth + logoSpacing

      ctx.translate(canvasElement.width / 2 - totalWidth / 2, canvasElement.height / 2 - logoHeight / 2)

      // Draw SIGN logo
      ctx.save()
      ctx.font = `bold ${logoHeight}px sans-serif`
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("SIGN", 0, logoHeight / 2)
      ctx.restore()

      // Draw UP logo
      ctx.save()
      ctx.translate(signLogoWidth + logoSpacing, 0)

      // Draw "UP" text
      ctx.font = `bold ${logoHeight}px sans-serif`
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("UP", 0, logoHeight / 2)

      // Draw arrow above the text
      const arrowSize = logoHeight * 0.5
      ctx.beginPath()
      ctx.moveTo(upLogoWidth / 2 - arrowSize / 2, -arrowSize * 0.2)
      ctx.lineTo(upLogoWidth / 2 + arrowSize / 2, -arrowSize * 0.2)
      ctx.lineTo(upLogoWidth / 2, -arrowSize * 1.2)
      ctx.closePath()
      ctx.fill()

      ctx.restore()

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height)
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

      return 1 // Return a scale factor
    }

    function createParticle(scale: number) {
      if (!ctx || !canvasElement || !textImageData) return null

      const data = textImageData.data
      const particleGap = 2

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvasElement.width)
        const y = Math.floor(Math.random() * canvasElement.height)

        if (data[(y * canvasElement.width + x) * 4 + 3] > 128) {
          const logoHeight = isMobile ? 60 : 120
          const signLogoWidth = logoHeight * 2.5
          const upLogoWidth = logoHeight * 1.5
          const logoSpacing = isMobile ? 30 : 60
          const totalWidth = signLogoWidth + upLogoWidth + logoSpacing
          const centerX = canvasElement.width / 2
          const isUpLogo = x >= centerX - totalWidth / 2 + signLogoWidth + logoSpacing
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: isUpLogo ? "#FF9900" : "#00DCFF", // Orange for UP, Cyan for SIGN
            isUp: isUpLogo,
            life: Math.random() * 100 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      const baseParticleCount = 7000 // Increased base count for higher density
      const particleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvasElement.width * canvasElement.height) / (1920 * 1080)),
      )
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvasElement) return
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 60
          const moveY = Math.sin(angle) * force * 60
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY

          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = "white"
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = 7000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvasElement.width * canvasElement.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvasElement.addEventListener("mousemove", handleMouseMove)
    canvasElement.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvasElement.addEventListener("mouseleave", handleMouseLeave)
    canvasElement.addEventListener("touchstart", handleTouchStart)
    canvasElement.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvasElement.removeEventListener("mousemove", handleMouseMove)
      canvasElement.removeEventListener("touchmove", handleTouchMove)
      canvasElement.removeEventListener("mouseleave", handleMouseLeave)
      canvasElement.removeEventListener("touchstart", handleTouchStart)
      canvasElement.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with SIGN and UP logos"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
          Join the{" "}
          <a
            href="https://vercel.fyi/v0-reinvent"
            target="_blank"
            className="invite-link text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            rel="noreferrer"
          >
            sign Happy Hour
          </a>{" "}
          <span>at</span>
          <span className="transition-colors duration-300"> up re:invent</span> <br />
          <a
            href="https://v0.dev/chat/RqstUbkUVcB?b=b_BoU5qmQ0ehp"
            className="text-gray-500 text-xs mt-2.5 inline-block"
            target="_blank"
            rel="noreferrer"
          >
            (fork this sign)
          </a>
          <style>{`
            a.invite-link:hover + span + span {
              color: #FF9900;
            }
          `}</style>
        </p>
      </div>
    </div>
  )
}
