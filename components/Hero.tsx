"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BusinessHero, interviews, vector, vector2 } from "../public/index.js";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [reversing, setReversing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Slight zoom when page first loads
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Scroll trigger (replaces clicking)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < 100 && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Handle reverse when back-to-top is clicked
  const handleReverse = () => {
    setReversing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setReversing(false), 2000);
  };

  return (
    <main className="relative flex justify-center w-full overflow-hidden text-white select-none">
      <div className="relative w-[2812.5px] h-[2000px] overflow-hidden">
        {/* === BACKGROUND IMAGE === */}
        <motion.div
          className="absolute w-[2812.5px] h-[2000px] -ml-[630px] bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.4)_100%),url('https://res.cloudinary.com/dnzntr9lt/image/upload/v1761663613/businessHero_qvuqwl.png')] bg-cover bg-center bg-no-repeat inset-0 will-change-transform"
          animate={{
            scale: scrolled ? 1.3 : loaded ? 1.1 : 1,
            y: scrolled ? -1100 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={BusinessHero}
            alt="Business Insight Background"
            fill
            priority
            className="object-cover brightness-75"
          />
        </motion.div>

        {/* === CONTENT WRAPPER === */}
        <div className="relative z-10 w-full max-h-screen pointer-events-none">
          <AnimatePresence mode="wait">
            {/* === HERO SECTION === */}
            {!scrolled && !reversing && (
              <motion.section
                key="hero"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -150 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative top-[250px] z-10 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 h-screen pointer-events-auto"
              >
                <div className="max-w-3xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[60px] md:text-[80px] w-[698px] lg:text-[90px] font-[400px] leading-tight "
                  >
                    Business Insight You Can Trust
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-[20px] font-sans w-[801px] py-5 text-gray-200"
                  >
                    We are committed to providing you with extensive market
                    intelligence in crucial business sectors across the world.
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-500 hover:bg-white font-sans text-white hover:text-orange-500 cursor-pointer font-semibold px-8 py-3 rounded-md transition-all pointer-events-auto"
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.section>
            )}

            {/* === EXCLUSIVE SECTION === */}
            {scrolled && (
              <motion.section
                key="exclusive"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                className="relative top-60 z-10 py-20 px-6 md:px-12 lg:px-20 h-screen bg-transparent pointer-events-auto"
              >
                <div className="mx-auto flex flex-col h-full justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
                  >
                    <div>
                      <h2 className="text-[60px] font-[500px] font-sans">
                        Exclusive Interviews
                      </h2>
                      <p className="text-gray-300 text-[20px] font-sans font-[500px] mt-2">
                        Unlock the insights of industry leaders
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 md:mt-0 bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer px-[37px] py-[13px] rounded-[10px] font-[500px] font-sans text-[20px] transition"
                    >
                      View All Interviews
                    </motion.button>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {interviews.map((person, i) => (
                      <motion.div
                        key={person.name}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.4 + i * 0.2,
                        }}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                      >
                        <div className="h-[416px] relative">
                          <Image
                            src={person.img}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-10">
                          <h3 className="font-[600px] text-[30px] font-sans">
                            {person.name}
                          </h3>
                          <p className="text-[20px] font-[500px] py-2.5 text-white font-sans mb-3">
                            {person.title}
                          </p>
                          <a
                            href={person.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-500 font-[500px] underline text-[18px] font-sans"
                          >
                            Read More <Image src={vector2} alt="vector-2" width={17.719} height={17.374} className="ml-1" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* === Back to Top Button === */}
                  <motion.button
                    onClick={handleReverse}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute top-200  right-10 bg-orange-500/80 hover:bg-orange-600 text-white p-3 rounded-full"
                  >
                    <Image
                      src={vector}
                      alt="vector"
                      width={62}
                      height={62}
                      className="py-[16.361px] px-[15.931px] flex"
                    />
                  </motion.button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Hero;
