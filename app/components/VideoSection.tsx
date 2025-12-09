"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, PlayCircle, PlayCircleIcon } from "lucide-react";

export default function StaticFeatureSection() {
  return (
    <section className="w-full bg-[#000000] text-white pb-20">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* MAIN FEATURED IMAGE */}
        <div className="relative w-full h-[350px] lg:h-[560px] rounded-3xl overflow-hidden mb-12 mt-16">
          <Image
            src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580198/4d1555a7496ef95c35313e654bb07ee691f4cff3_mz6raq.png" // place your image in public/images
            alt="Featured"
            fill
            className="object-cover"
            priority
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-10 left-5 lg:left-10 max-w-[650px]">
            <p className="uppercase text-sm tracking-wide text-gray-300">
              Education
            </p>

            <h1 className="text-[clamp(1rem,3vw,3.2rem)] font-semibold leading-tight mt-2">
              Singapore’s Aerospace Industry Looks to Automation and Disruptive
              Technologies for Growth
            </h1>

            {/* Play Button */}
            <Link href="/somewhere">
              <div className="flex items-center gap-3 mt-6 cursor-pointer">
                <div className="w-[46px] h-[46px] rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                  <Play className="text-white" />
                </div>
                <span className="text-gray-200 text-sm">16:08</span>
              </div>
            </Link>
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {/* CARD 1 */}
          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <div className="relative w-full h-[290px] md:h-[200px] lg:h-[290px] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580251/77438542680a0e7d0d0dbfc0bfe6c5e9e2d99db9_kogovb.png"
                alt="Chile’s Copper Production and Advancements"
                fill
                className="object-cover"
              />

              {/* Play button */}
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[50px] h-[50px] rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition">
                  <Play className="text-white" />
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-wide text-gray-400 mt-3">
              Oil & Gas
            </p>
            <p className="font-medium text-[1.05rem] leading-tight mt-1">
              Chile’s Copper Production and Advancements
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="relative w-full h-[290px] md:h-[200px] lg:h-[290px] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580293/ca49de05ec6e0b70fea7e585a6725f5416b62d47_s6nsvu.png"
                alt="Automation and Disruptive Technologies"
                fill
                className="object-cover"
              />

              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[50px] h-[50px] rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition">
                  <Play className="text-white" />
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-wide text-gray-400 mt-3">
              Education
            </p>
            <p className="font-medium text-[1.05rem] leading-tight mt-1">
              Singapore’s Aerospace Industry Looks to Automation and Disruptive
              Technologies…
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="relative w-full h-[290px] md:h-[200px] lg:h-[290px] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580333/b2b4a08d33bdc8cb0a00c3125bd2f541674ffac6_zizizu.png"
                alt="India’s Pharma Industry"
                fill
                className="object-cover"
              />

              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[50px] h-[50px] rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition">
                  <Play className="text-white" />
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-wide text-gray-400 mt-3">
              Aerospace
            </p>
            <p className="font-medium text-[1.05rem] leading-tight mt-1">
              India’s Pharma Industry: Navigating Beyond Pandemic Triumphs
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
