"use client";

import { BusinessHero, interviews, vector2 } from "@/public";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
interface ExclusiveInterview {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  write_up: string;
}

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [vh, setVh] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const [exclusiveInterviews, setExclusiveInterviews] = useState<
    ExclusiveInterview[]
  >([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
      .then((res) => res.json())
      .then((data) => setExclusiveInterviews(data))
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  // === HANDLE RESIZE FOR RESPONSIVE SCROLL ===
  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === SCROLL PROGRESS ===
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // === SPRING FOR SMOOTHNESS ===
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 12,
    damping: 20,
    mass: 0.6,
  });

  // === PARALLAX ANIMATIONS (RESPONSIVE) ===
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.6]);
  const yBackground = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);

  const opacityText = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const yText = useTransform(smoothProgress, [0, 0.45], ["0%", "-12%"]);

  const opacityNextSection = useTransform(smoothProgress, [0.35, 1], [0, 1]);
  const yNextSection = useTransform(smoothProgress, [0.45, 1], ["15%", "0%"]);

  // === AUTO SCROLL CONTROL (ADAPTIVE) ===
  // === AUTO SCROLL CONTROL (ADAPTIVE) ===
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (autoScrolling) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 768;

      // Trigger earlier on mobile (faster feel)
      const triggerDown = isMobile ? vh * 0.3 : vh * 0.45;

      // Get the next section top position
      const nextTop =
        nextSectionRef.current?.getBoundingClientRect().top! + window.scrollY;

      // Smooth scroll down once hero passes threshold
      if (!scrolled && y > triggerDown) {
        setScrolled(true);
        setAutoScrolling(true);

        // Always scroll to exact start of the next section
        window.scrollTo({
          top: nextTop,
          behavior: "smooth",
        });

        // Delay to avoid mid-scroll flickers
        setTimeout(
          () => {
            setAutoScrolling(false);
            setShowNext(true);
          },
          isMobile ? 1600 : 300
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, autoScrolling, vh]);

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Only show 2 on mobile, all on larger screens
  const visibleInterviews = isMobile
    ? exclusiveInterviews.slice(0, 2)
    : exclusiveInterviews;

  return (
    <section
      ref={ref}
      className="relative  h-[260vh] md:h-[200vh] lg:h-[220vh] overflow-hidden bg-black"
    >
      <Navbar />

      {/* === BACKGROUND === */}
      <motion.div
        style={{ scale, y: yBackground }}
        className="absolute w-full h-[220vh] inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-[5] pointer-events-none" />
        <Image
          src={BusinessHero}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </motion.div>

      {/* === HERO TEXT === */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 flex flex-col items-start justify-center h-screen px-[clamp(1rem,5vw,6rem)] text-left"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-[400] pt-5 lg:pt-20 text-white leading-tight max-w-[min(90%,690px)] text-[clamp(3.2rem,6.5vw,5.7rem)]"
        >
          Business Insight You Can Trust
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 max-w-[min(90%,550px)] font-sans text-white/80 font-[500] text-[clamp(1rem,2.5vw,1.3rem)] leading-relaxed"
        >
          We are committed to providing you with extensive market intelligence
          in crucial business sectors across the world.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] px-[clamp(1rem,4vw,2rem)] py-[clamp(0.6rem,1.5vw,1rem)] rounded-xl font-semibold tracking-wide font-sans text-[clamp(1rem,2vw,1.2rem)] shadow-md"
        >
          Explore
        </motion.button>
      </motion.div>

      {/* === NEXT SECTION === */}
      <motion.div
        ref={nextSectionRef}
        style={{ opacity: opacityNextSection, y: yNextSection }}
        className="relative font-sans bottom-0 z-10 w-full h-screen flex items-center justify-center px-[clamp(1rem,5vw,5rem)] bg-transparent text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={showNext ? { opacity: 4, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="max-w-[1300px] w-full mx-auto flex flex-col justify-center"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
            <div>
              <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold font-sans">
                Exclusive Interviews
              </h2>
              <p className="text-gray-300 text-[clamp(1rem,2vw,1.25rem)] mt-2">
                Unlock the insights of industry leaders
              </p>
            </div>
            <Link href="/Interviews">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] cursor-pointer px-[clamp(1rem,4vw,2rem)] py-[clamp(0.6rem,1.2vw,1rem)] rounded-[10px] font-medium text-[clamp(1rem,2vw,1.25rem)]"
              >
                View All Interviews
              </motion.button>
            </Link>
          </div>

          {/* INTERVIEW GRID */}
         {/* INTERVIEW GRID */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={showNext ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-[55px]"
>
  {visibleInterviews.map((person) => (
    <motion.div
      key={person.name}
      className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
    >
      {/* Image container — fixed height */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <Image
          src={person.image_url}
          alt={person.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top"
        />
      </div>

      <div className="pt-[clamp(1rem,3vw,1.5rem)] px-[0px]">
        <h3 className="font-semibold text-[clamp(1.3rem,2.5vw,1.9rem)]">
          {person.name}
        </h3>
        <p className="text-[clamp(0.9rem,2vw,1.1rem)] py-2 text-white mb-3">
          {person.description}
        </p>
        <Link
          href={`/exclusive/${exclusiveInterviews}`}
          className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[clamp(0.9rem,1.8vw,1.1rem)]"
        >
          Read More{" "}
          <Image
            src={vector2}
            alt="vector-2"
            width={17}
            height={17}
            className="ml-1"
          />
        </Link>
      </div>
    </motion.div>
  ))}
</motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}
