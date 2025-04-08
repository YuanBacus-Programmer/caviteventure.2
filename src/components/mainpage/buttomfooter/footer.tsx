"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Clock, MapPin, Phone, Building } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#8B4513] to-[#f8f5f0] py-12 md:py-16 px-6 lg:px-24 border-t border-[#e6d7c3] relative">
      {/* Decorative buildings silhouette at the top */}
      <div className="absolute top-0 left-0 w-full h-12 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23f5f0e5'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto">
        {/* Top Section with Logo, Info and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#e6d7c3]/30">
          {/* Logo & Museum Info */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" aria-label="Home" className="mb-4 flex items-center">
              <div className="relative w-[120px] h-[40px] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="CaviteVenture Logo"
                  width={120}
                  height={40}
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-[#f8f5f0]" />
              <h3 className="text-[#f8f5f0] font-serif text-lg">CaviteVenture Heritage</h3>
            </div>
            <p className="text-[#f8f5f0]/80 text-sm">Preserving our past, inspiring our future</p>
          </motion.div>

          {/* Visit Information */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h4 className="text-[#f8f5f0] font-serif text-lg mb-4 relative">
              <span className="relative z-10">Visit Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#f8f5f0]/30 rounded-full"></span>
            </h4>
            <div className="flex flex-col space-y-3 text-[#f8f5f0]/80 text-sm">
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center mr-3 group-hover:bg-[#f8f5f0]/20 transition-colors">
                  <Clock className="w-4 h-4 text-[#f8f5f0]" />
                </div>
                <span>Tue-Sun: 10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center mr-3 group-hover:bg-[#f8f5f0]/20 transition-colors">
                  <MapPin className="w-4 h-4 text-[#f8f5f0]" />
                </div>
                <span>123 Heritage Lane, Cavite</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center mr-3 group-hover:bg-[#f8f5f0]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#f8f5f0]" />
                </div>
                <span>(555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h4 className="text-[#f8f5f0] font-serif text-lg mb-4 relative">
              <span className="relative z-10">Explore</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#f8f5f0]/30 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-2">
              {[
                { name: "Exhibitions", path: "/exhibitions" },
                { name: "Collections", path: "/collections" },
                { name: "Events", path: "/events" },
                { name: "Education", path: "/education" },
                { name: "Membership", path: "/membership" },
              ].map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className="text-[#f8f5f0]/80 hover:text-[#f8f5f0] transition duration-300 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f8f5f0]/40 mr-2 group-hover:bg-[#f8f5f0] transition-colors"></span>
                  {name}
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Newsletter Signup */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h4 className="text-[#f8f5f0] font-serif text-lg mb-4 relative">
              <span className="relative z-10">Stay Connected</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#f8f5f0]/30 rounded-full"></span>
            </h4>
            <p className="text-[#f8f5f0]/80 text-sm mb-4">
              Subscribe to our newsletter for updates on exhibitions and events
            </p>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2.5 bg-[#f8f5f0] border border-[#e6d7c3] rounded-l-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#8B4513] text-[#654321]"
              />
              <motion.button
                className="bg-[#654321] hover:bg-[#543210] text-[#f8f5f0] px-4 py-2.5 rounded-r-md text-sm transition duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section with Copyright and Social */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.p
            className="text-[#f8f5f0]/80 text-sm text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            © {new Date().getFullYear()} CaviteVenture Heritage. All rights reserved.
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            className="flex gap-4 mt-4 md:mt-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center hover:bg-[#f8f5f0]/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#f8f5f0]" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center hover:bg-[#f8f5f0]/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-[#f8f5f0]" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#f8f5f0]/10 flex items-center justify-center hover:bg-[#f8f5f0]/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#f8f5f0]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative buildings silhouette at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden opacity-10 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,0 L25,0 L25,20 L35,20 L35,30 L45,30 L45,20 L55,20 L55,0 L75,0 L75,15 L85,15 L85,25 L95,25 L95,15 L105,15 L105,0 L125,0 L125,25 L135,25 L135,35 L145,35 L145,25 L155,25 L155,0 L175,0 L175,20 L185,20 L185,30 L195,30 L195,20 L205,20 L205,0 L225,0 L225,15 L235,15 L235,25 L245,25 L245,15 L255,15 L255,0 L275,0 L275,25 L285,25 L285,35 L295,35 L295,25 L305,25 L305,0 L325,0 L325,20 L335,20 L335,30 L345,30 L345,20 L355,20 L355,0 L375,0 L375,15 L385,15 L385,25 L395,25 L395,15 L405,15 L405,0 L425,0 L425,25 L435,25 L435,35 L445,35 L445,25 L455,25 L455,0 L475,0 L475,20 L485,20 L485,30 L495,30 L495,20 L505,20 L505,0 L525,0 L525,15 L535,15 L535,25 L545,25 L545,15 L555,15 L555,0 L575,0 L575,25 L585,25 L585,35 L595,35 L595,25 L605,25 L605,0 L625,0 L625,20 L635,20 L635,30 L645,30 L645,20 L655,20 L655,0 L675,0 L675,15 L685,15 L685,25 L695,25 L695,15 L705,15 L705,0 L725,0 L725,25 L735,25 L735,35 L745,35 L745,25 L755,25 L755,0 L775,0 L775,20 L785,20 L785,30 L795,30 L795,20 L805,20 L805,0 L825,0 L825,15 L835,15 L835,25 L845,25 L845,15 L855,15 L855,0 L875,0 L875,25 L885,25 L885,35 L895,35 L895,25 L905,25 L905,0 L925,0 L925,20 L935,20 L935,30 L945,30 L945,20 L955,20 L955,0 L975,0 L975,15 L985,15 L985,25 L995,25 L995,15 L1000,15 L1000,0 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
            transform: "rotate(180deg)",
          }}
        ></div>
      </div>
    </footer>
  )
}

export default Footer
