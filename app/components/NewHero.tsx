"use client";

import { BusinessHero } from "@/public";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import Navbar from "./Navbar";

export default function NewHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden">
        <Navbar />
      {/* Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={BusinessHero}
          alt="Earth Background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Text */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Business Insight <br /> You Can Trust
        </h1>
        <p className="mt-6 max-w-xl text-white/80">
          We are committed to providing you with extensive market intelligence
          in crucial business sectors across the world.
        </p>
        <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition">
          Explore
        </button>
      </motion.div>
    </section>
  );
}
