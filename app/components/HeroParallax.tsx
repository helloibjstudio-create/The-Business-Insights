"use client";

import { BusinessHero, interviews, vector2 } from "@/public";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const [showNext, setShowNext] = useState(false);

  // === SCROLL PROGRESS ===
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // === SPRING FOR SMOOTHNESS ===
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.4,
  });

  // === PARALLAX ANIMATIONS ===
  // Background zooms out gently
const scale = useTransform(smoothProgress, [0, 1], [1, 1.6]);
const yBackground = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  // Hero text fades out and moves up
  const opacityText = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const yText = useTransform(smoothProgress, [0, 0.45], ["0%", "-10%"]);

  // Next section fades in slightly earlier and moves up
  const opacityNextSection = useTransform(smoothProgress, [0.35, 1], [0, 1]);
  const yNextSection = useTransform(smoothProgress, [0.45, 1], ["15%", "0%"]);

  // === AUTO SCROLL CONTROL ===
  useEffect(() => {
    const handleScroll = () => {
      if (autoScrolling) return;

      const y = window.scrollY;
      const vh = window.innerHeight;

      // Smooth transition trigger
      if (!scrolled && y > vh * 0.45) {
        setScrolled(true);
        setAutoScrolling(true);

        window.scrollTo({
          top: vh,
          behavior: "smooth",
        });

        setTimeout(() => {
          setAutoScrolling(false);
          setShowNext(true);
        }, 1600);
      }

      // Scroll back up
      if (scrolled && y < vh * 0.3) {
        setScrolled(false);
        setAutoScrolling(true);
        setShowNext(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          setAutoScrolling(false);
        }, 1300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, autoScrolling]);

  return (
    <section ref={ref} className="relative h-[200vh] overflow-hidden bg-black">
      <Navbar />

      {/* === BACKGROUND IMAGE === */}
      <motion.div
        style={{ scale, y: yBackground }}
        className="absolute w-full h-[2000px] inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-[5] pointer-events-none" />
        <Image
          src={BusinessHero}
          alt="Earth Background"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </motion.div>

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 flex flex-col items-start justify-center h-screen text-left px-6 md:px-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-[90px] md:text-7xl font-[400] text-white leading-tight max-w-[605px]"
        >
          Business Insight You Can Trust
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7 }}
          className="mt-6 max-w-xl font-sans font-[500] text-white/80 text-lg md:text-xl"
        >
          We are committed to providing you with extensive market intelligence
          in crucial business sectors across the world.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="mt-10 bg-[#E8602E] hover:bg-white text-white font-sans cursor-pointer hover:text-[#E8602E] px-8 py-3 rounded-xl font-semibold tracking-wide text-lg shadow-md"
        >
          Explore
        </motion.button>
      </motion.div>

      {/* === NEXT SECTION === */}
      <motion.div
        style={{ opacity: opacityNextSection, y: yNextSection }}
        className="absolute z-30 bottom-0 w-full text-white h-screen bg-transparent px-8 md:px-16 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={showNext ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-6xl w-full mx-auto flex flex-col justify-center"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-semibold font-sans">
                Exclusive Interviews
              </h2>
              <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] font-sans mt-2">
                Unlock the insights of industry leaders
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-[#E8602E] hover:bg-white text-white hover:text-white cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-medium font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
            >
              View All Interviews
            </motion.button>
          </div>

          {/* INTERVIEW GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showNext ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {interviews.map((person) => (
              <motion.div
                key={person.name}
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
                  <h3 className="font-semibold text-[22px] sm:text-[26px] md:text-[30px] font-sans">
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
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
