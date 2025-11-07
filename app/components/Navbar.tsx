"use client";

import { BusinessLogo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // ✅ All routes lowercase to match /app directory
  const navLinks = [
    { name: "Interviews", href: "/Interviews" },
    { name: "Articles", href: "/articles" },
    { name: "Reports", href: "/reports" },
    { name: "Events", href: "/Events" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-60 px-6 sm:px-10 py-6 flex items-center justify-between text-white backdrop-blur-md bg-black/30 border-b border-white/10 transition-all">
      {/* === LOGO === */}
      <Link href="/" className="flex items-center relative z-50">
        <Image
          src={BusinessLogo}
          alt="Business Insight Logo"
          width={200}
          height={45}
          className="w-[160px] sm:w-[200px] md:w-[244px] transition-all"
        />
      </Link>

      {/* === DESKTOP LINKS === */}
      <ul className="hidden lg:flex space-x-8 text-[16px] font-sans font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`relative transition-colors duration-300 ${
                  isActive
                    ? "text-[#E25B2B] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#E25B2B]"
                    : "hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* === SEARCH BAR (DESKTOP) === */}
      <form
        onSubmit={handleSearch}
        className="hidden lg:flex border border-gray-500/40 rounded-xl px-3 py-2 items-center space-x-2 relative z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400 w-[120px]"
        />
      </form>

      {/* === MOBILE MENU ICON === */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden flex text-white focus:outline-none z-50 relative"
      >
        {menuOpen ? <X size={30} strokeWidth={2.5} /> : <Menu size={30} strokeWidth={2.5} />}
      </motion.button>

      {/* === MOBILE FULLSCREEN MENU === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-90 flex flex-col items-center justify-center space-y-10 text-white text-2xl h-screen font-semibold font-sans"
          >
            {navLinks.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`transition-colors ${
                      isActive
                        ? "text-[#E25B2B] underline underline-offset-4"
                        : "hover:text-orange-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
