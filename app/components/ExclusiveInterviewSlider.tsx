"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

export default function ExclusiveInterviewsSlider() {
  const [exclusiveInterviews, setExclusiveInterviews] = useState<ExclusiveInterview[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);

  // Fetch interviews
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setExclusiveInterviews(data);
        else if (Array.isArray(data?.data)) setExclusiveInterviews(data.data);
        else setExclusiveInterviews([]);
      })
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  // Continuous scrolling
  useEffect(() => {
    if (!exclusiveInterviews.length) return;

    const speed = 0.5; // pixels per frame

    const animate = () => {
      x.set(x.get() - speed);

      // Reset position for seamless loop
      if (sliderRef.current) {
        const totalWidth = sliderRef.current.scrollWidth / 2; // because we duplicate items
        if (Math.abs(x.get()) >= totalWidth) {
          x.set(0);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [exclusiveInterviews, x]);

  // Pause & resume
  const handleMouseEnter = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const handleMouseLeave = () => {
    const speed = 0.5;
    const animate = () => {
      x.set(x.get() - speed);
      if (sliderRef.current) {
        const totalWidth = sliderRef.current.scrollWidth / 2;
        if (Math.abs(x.get()) >= totalWidth) x.set(0);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

    const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]); 

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <motion.div className="relative bg-[#0E1116] text-white overflow-y-hidden">
      {/* HEADER */}
      <div className="flex pt-12 max-w-[1400px] mx-auto flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6 px-4">
        <div>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold">Exclusive Interviews</h2>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.25rem)] mt-2">
            Unlock the insights of industry leaders
          </p>
        </div>
        <Link href="/Interviews">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#E8602E] hover:bg-white text-white cursor-pointer hover:text-[#E8602E] px-6 py-3 rounded-xl"
          >
            View All Interviews
          </motion.button>
        </Link>
      </div>

      {/* SLIDER */}
      <div className="max-w-[1400px] mx-auto relative">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 w-12 h-12 rounded-full flex items-center cursor-pointer justify-center"
        >
          <ArrowLeft className="text-white" />
        </button>

        <div className="relative overflow-hidden">
          <motion.div
            ref={sliderRef}
            className="flex gap-6"
            style={{ x }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {[...exclusiveInterviews, ...exclusiveInterviews].map((person, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[330px] lg:min-w-[360px] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 min-h-[460px] relative"
              >
                <div className="absolute w-full h-full">
                  <Image src={person.image_url} alt={person.name} fill className="object-cover" />
                </div>
                <div className="p-5 font-sans w-[98%] backdrop-blur-2xl rounded-2xl m-auto mb-1 right-0 left-0 bottom-0 absolute bg-black/60">
                  <h3 className="font-semibold text-xl">{person.name}</h3>
                  <p className="text-grey-900 text-sm mt-1 mb-2">{person.description}</p>
                  <hr className="text-[#E8602E]" />
                  <Link href={`/exclusive/${person.id}`} className="inline-flex items-center mt-3 text-[#E8602E] hover:underline text-sm">
                    Read Interview
                    <ArrowRight className="w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 w-12 h-12 rounded-full flex items-center cursor-pointer justify-center"
        >
          <ArrowRight className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
