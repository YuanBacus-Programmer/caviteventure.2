"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Clock, MapPin, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#8B7D62] to-[#F5F2E8] py-10 md:py-16 px-6 lg:px-24 border-t border-amber-800/20">
      <div className="container mx-auto">
        {/* Top Section with Logo, Info and Navigation */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-8 pb-8 border-b border-amber-800/20">
          {/* Logo & Museum Info */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" aria-label="Home">
              <div className="mb-4 relative w-[120px] h-[40px] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Museum Logo"
                  width={120}
                  height={40}
                  priority
                  className="mb-4"
                />
              </div>
            </Link>
            <h3 className="text-amber-900 font-serif text-lg mb-2">Historical Heritage Museum</h3>
            <p className="text-amber-800/80 text-sm">Preserving our past, inspiring our future</p>
          </motion.div>

          {/* Visit Information */}
          <motion.div
            className="flex flex-col items-center lg:items-start mt-6 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h4 className="text-amber-900 font-serif text-lg mb-3">Visit Us</h4>
            <div className="flex flex-col space-y-2 text-amber-800/80 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Tue-Sun: 10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 History Lane, Antiquity</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            className="flex flex-col items-center lg:items-start mt-6 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h4 className="text-amber-900 font-serif text-lg mb-3">Explore</h4>
            <div className="flex flex-col space-y-2">
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
                  className="text-amber-800/80 hover:text-amber-900 transition duration-300 text-sm"
                >
                  {name}
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Newsletter Signup */}
          <motion.div
            className="flex flex-col items-center lg:items-start mt-6 lg:mt-0 max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h4 className="text-amber-900 font-serif text-lg mb-3">Stay Connected</h4>
            <p className="text-amber-800/80 text-sm mb-3">
              Subscribe to our newsletter for updates on exhibitions and events
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-l-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-3 py-2 rounded-r-md text-sm transition duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section with Copyright and Social */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.p
            className="text-amber-800/80 text-sm text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            © {new Date().getFullYear()} Historical Heritage Museum. All rights reserved.
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            className="flex gap-4 mt-4 md:mt-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-900 transition duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-900 transition duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-900 transition duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

