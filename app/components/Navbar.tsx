"use client";

import { BusinessLogo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // clean icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-30 px-6 sm:px-10 py-6 flex items-center justify-between text-white backdrop-blur-md bg-black/20 border-b border-white/10 transition-all">
      {/* === LOGO === */}
      <Link href="/" className="flex items-center">
        <Image
          src={BusinessLogo}
          alt="Business Insight Logo"
          width={180}
          height={45}
          className="w-[160px] sm:w-[200px] md:w-[244px] transition-all"
        />
      </Link>

      {/* === DESKTOP LINKS === */}
      <ul className="hidden lg:flex space-x-8 text-[16px] font-sans font-medium">
        <li><Link href="/Interviews" className="hover:text-orange-400">Interviews</Link></li>
        <li><Link href="/articles" className="hover:text-orange-400">Articles</Link></li>
        <li><Link href="/reports" className="hover:text-orange-400">Reports</Link></li>
        <li><Link href="/Events" className="hover:text-orange-400">Events</Link></li>
        <li><Link href="/About" className="hover:text-orange-400">About Us</Link></li>
      </ul>

      {/* === SEARCH (DESKTOP ONLY) === */}
      <div className="hidden lg:flex border border-gray-400 rounded-xl px-3 py-2 items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400 w-[120px]"
        />
      </div>

      {/* === MOBILE HAMBURGER ICON === */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex text-white focus:outline-none z-40 relative"
      >
        <motion.div
          animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4 }}
            >
              <X size={30} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.4 }}
            >
              <Menu size={30} strokeWidth={2.5} />
            </motion.div>
          )}
        </motion.div>
      </motion.button>

      {/* === FULL-SCREEN MOBILE MENU === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-7xl z-30 flex flex-col items-center justify-center h-screen space-y-10 text-white text-2xl font-semibold font-sans"
          >
            {[
              { name: "Interviews", href: "/Interviews" },
              { name: "Articles", href: "/articles" },
              { name: "Reports", href: "/reports" },
              { name: "Events", href: "/Events" },
              { name: "About Us", href: "/About" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-orange-400 cursor-pointer transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
