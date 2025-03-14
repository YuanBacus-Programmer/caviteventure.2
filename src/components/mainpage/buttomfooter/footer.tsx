"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/headerimages/logosaas.png"; // Add your logo image in this path

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#cbbd93] to-white py-10 md:py-16 px-6 lg:px-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Logo & Copyright */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link href="/" aria-label="Home">
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              priority
              className="mb-4"
            />
          </Link>
          <p className="text-gray-700 text-sm sm:text-base">
            © {new Date().getFullYear()} Cavite Venture. All rights reserved.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          className="flex flex-wrap justify-center lg:justify-end gap-6 mt-6 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Explore", path: "/explore" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className="text-gray-800 hover:text-gray-600 transition duration-300 text-sm sm:text-base"
            >
              {name}
            </Link>
          ))}
        </motion.nav>

        {/* Social Media Icons */}
        <motion.div
          className="flex gap-4 mt-6 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {[
            { icon: "fa-brands fa-facebook", link: "https://facebook.com" },
            { icon: "fa-brands fa-twitter", link: "https://twitter.com" },
            { icon: "fa-brands fa-instagram", link: "https://instagram.com" },
          ].map(({ icon, link }) => (
            <Link
              key={icon}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
              aria-label="Social Link"
            >
              <i className={icon}></i>
            </Link>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
