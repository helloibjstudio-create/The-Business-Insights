"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  articles,
  BusinessHero,
  interviews,
  vector,
  vector2,
} from "../public/index.js";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [reversing, setReversing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // === SCROLL + SECTION ANIMATION CONTROL ===
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const width = window.innerWidth;

      // === DYNAMIC SCROLL TARGETS ===
      let exclusiveTrigger;
      if (width < 640) exclusiveTrigger = vh * 0.9; // mobile
      else if (width < 1024) exclusiveTrigger = vh * 1.0; // tablet
      else exclusiveTrigger = vh * 1.1; // desktop

      const isScrollingDown = y > lastScrollY;
      const isScrollingUp = y < lastScrollY;
      lastScrollY = y;

      // Track zoom trigger
      if (y > 150 && !scrolled) {
        setScrolled(true);

        // ✅ scroll directly to top of exclusive section smoothly
        window.scrollTo({
          top: exclusiveTrigger - vh * 0.8,
          behavior: "smooth",
        });
      } else if (y < 100 && scrolled) {
        setScrolled(false);
      }

      // === ARTICLE FADE-IN / FADE-OUT ===
      const articleTrigger = exclusiveTrigger + vh * 0.5; // start showing later
      const articleEnd = exclusiveTrigger + vh * 0.9;

      if (width < 768) {
        if (isScrollingDown && y > exclusiveTrigger * 0.8 && !showArticles) {
          setShowArticles(true);
        } else if (
          isScrollingUp &&
          y < exclusiveTrigger * 0.7 &&
          showArticles
        ) {
          setShowArticles(false);
        }
      }

      if (isScrollingDown && y > articleTrigger && !showArticles) {
        setShowArticles(true);
      }
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, showArticles]);

  // === REVERSE TO HERO ===
  const handleReverse = () => {
    setReversing(true);
    setShowArticles(false);
    setScrolled(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    setTimeout(() => setReversing(false), 1200);
  };

  return (
    <main className="relative flex justify-center w-full overflow-hidden text-white select-none">
      <div className="relative w-full min-h-[640vh] sm:min-h-[640vh] md:min-h-[600vh] lg:min-h-[280vh] overflow-hidden">
        {/* === BACKGROUND IMAGE === */}
        <motion.div
          className="absolute w-full h-[2200px] bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.4)_100%),url('https://res.cloudinary.com/dnzntr9lt/image/upload/v1761663613/businessHero_qvuqwl.png')] bg-cover bg-center bg-no-repeat inset-0"
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
                className="relative top-[80px] sm:top-[110px] md:top-[140px] lg:top-[160px] flex flex-col justify-center items-start px-4 sm:px-8 md:px-12 lg:px-20 h-[90vh] sm:h-screen pointer-events-auto"
              >
                <div className="max-w-[95%] sm:max-w-2xl md:max-w-3xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[36px] sm:text-[50px] md:text-[70px] lg:text-[90px] font-[400px] leading-tight"
                  >
                    Business Insight You Can Trust
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-base sm:text-lg md:text-[20px] font-sans max-w-[95%] sm:max-w-[700px] md:max-w-[801px] py-5 text-gray-200"
                  >
                    We are committed to providing you with extensive market
                    intelligence in crucial business sectors across the world.
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-500 hover:bg-white font-sans text-white hover:text-orange-500 cursor-pointer font-semibold px-6 sm:px-8 py-3 rounded-md transition-all pointer-events-auto text-sm sm:text-base"
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
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="relative top-[120px] sm:top-[150px] md:top-[180px] lg:top-[200px] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen bg-transparent pointer-events-auto"
              >
                <div className="mx-auto flex flex-col h-full justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6"
                  >
                    <div>
                      <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-[500px] font-sans">
                        Exclusive Interviews
                      </h2>
                      <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] font-sans mt-2">
                        Unlock the insights of industry leaders
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-[500px] font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
                    >
                      View All Interviews
                    </motion.button>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {interviews.map((person, i) => (
                      <motion.div
                        key={person.name}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                      >
                        <div className="h-[300px] sm:h-[400px] relative">
                          <Image
                            src={person.img}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-6 sm:pt-8 px-4">
                          <h3 className="font-[600px] text-[22px] sm:text-[26px] md:text-[30px] font-sans">
                            {person.name}
                          </h3>
                          <p className="text-[16px] sm:text-[18px] py-2.5 text-white font-sans mb-3">
                            {person.title}
                          </p>
                          <a
                            href={person.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[16px] sm:text-[18px] font-sans"
                          >
                            Read More{" "}
                            <Image
                              src={vector2}
                              alt="vector-2"
                              width={17}
                              height={17}
                              className="ml-1"
                            />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* === ARTICLES SECTION === */}
            {showArticles && (
              <motion.section
                key="articles"
                initial={{ opacity: 0, y: 250 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -150 }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 1.2, ease: "easeInOut" },
                }}
                className="relative top-[100px] sm:top-[240px] md:top-[260px] lg:top-[280px] py-16 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-auto"
              >
                <div className="max-w-7xl mx-auto pb-24">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
                    <div>
                      <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-[500px] font-sans">
                        Articles
                      </h2>
                      <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] font-sans mt-2">
                        Explore our latest articles and insights for a fresh
                        perspective on industry trends and news.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-[500px] font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
                    >
                      View All Articles
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.map((article, i) => (
                      <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform bg-black/20"
                      >
                        <div className="h-[250px] sm:h-[350px] md:h-[416px] relative">
                          <Image
                            src={article.img}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-6 sm:pt-8 px-4 pb-8">
                          <h3 className="font-[600px] text-[20px] sm:text-[22px] md:text-[26px] font-sans">
                            {article.title}
                          </h3>
                          <p className="text-[16px] sm:text-[18px] py-2.5 text-gray-300 font-sans mb-3">
                            {article.description}
                          </p>
                          <a
                            href={article.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[16px] sm:text-[18px] font-sans"
                          >
                            Read More{" "}
                            <ArrowUpRight size={18} className="ml-1" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* === BACK TO TOP BUTTON === */}
        {scrolled && (
          <motion.button
            key="reverse-btn"
            onClick={handleReverse}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 z-50 bg-orange-500/80 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full shadow-lg"
          >
            <Image
              src={vector}
              alt="vector"
              width={20}
              height={20}
              className="sm:w-[30px] sm:h-[30px]"
            />
          </motion.button>
        )}
      </div>
    </main>
  );
};

export default Hero;
