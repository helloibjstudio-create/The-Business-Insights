"use client";

import { Cart } from "@/public";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Report {
  id: number;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
}

export default function FeaturedReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Motion system for infinite loop
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Start continuous infinite animation
const startAnimation = () => {
  const current = x.get(); // keep position
  controls.start({
    x: [current, current - sliderWidth], 
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 30,
    },
  });
};

  // Start animation after reports are loaded
useEffect(() => {
  if (reports.length > 0) {
    const w = (reports.length * 260) + (reports.length * 32); // width + gap
    setSliderWidth(w);

    const current = x.get();
    controls.start({
      x: [current, current - w], // slide by full width
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 30, // adjust speed here
      },
    });
  }
}, [reports]);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/reports`
        );
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  // Scroll buttons
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  // Handle report selection
  const handleSelectReport = (report: Report) => {
    if (sliderRef.current) setScrollPos(sliderRef.current.scrollLeft);
     controls.stop(); 
    setSelectedReport(report);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedReport) {
      document.body.style.overflow = "hidden";
      if (sliderRef.current) sliderRef.current.scrollLeft = scrollPos;
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedReport, scrollPos]);

  return (
    <section className="w-full bg-[#0B0B0D] text-white py-20 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
          <div>
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold">
              Featured Reports
            </h2>
            <p className="text-gray-300 text-[1.1rem] mt-2 mb-8">
              Essential insights on key trends and leadership.
            </p>
          </div>

          <Link href="/reports" className="w-fit">
            <motion.button
              whileHover={{ scale: 1.04 }}
              className="bg-[#E8602E] hover:bg-white hover:text-[#E8602E] text-white px-7 py-3 rounded-xl cursor-pointer font-medium flex items-center gap-2"
            >
              View All Reports <ArrowRight />
            </motion.button>
          </Link>
        </div>

        {/* Slider */}
        {/* Infinite Loop Slider */}
        {/* Slider */}
        <div className="relative overflow-hidden">
          {/** Motion Setup */}
          <motion.div
            ref={sliderRef}
            className="flex gap-8"
            style={{ x }} // ← use motion value
            animate={controls} // ← control animation
          >
            {[...reports.slice(0, 9), ...reports.slice(0, 9)].map(
              (item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  onClick={() => handleSelectReport(item)}
                  onMouseEnter={() => {
    // Only stop animation if device has a pointer (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
      controls.stop();
    }
  }}
  onMouseLeave={() => {
    if (window.matchMedia("(pointer: fine)").matches && !selectedReport) {
      startAnimation();
    }
  }}    
// ← resume on leave
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[260px] max-w-[260px] bg-[#111113] border border-gray-600/40 rounded-xl shadow-lg overflow-hidden cursor-pointer flex-shrink-0"
                >
                  <div className="relative w-full h-[360px]">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-[1.1rem] leading-tight">
                        {item.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[15px] line-through mt-1">
                        ${item.discounted_price}
                      </p>
                      <p className="text-red-400 text-sm mt-1">${item.price}</p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Left Button */}
          {/* <button
            onClick={() => nudge(300)} // ← use custom nudge instead of scrollBy
            className="flex absolute left-0 top-1/2 -translate-y-1/2
      bg-black/30 backdrop-blur-md border border-white/20 text-white
      w-12 h-12 rounded-full items-center justify-center cursor-pointer hover:bg-white/20 transition z-20"
          >
            <ArrowLeft />
          </button>

          {/* Right Button */}
          {/* <button
            onClick={() => nudge(-300)} // ← custom nudge
            className="flex absolute right-0 top-1/2 -translate-y-1/2
      bg-black/30 backdrop-blur-md border border-white/20 text-white
      w-12 h-12 rounded-full items-center cursor-pointer justify-center hover:bg-white/20 transition z-20"
          >
            <ArrowRight />
          </button> */}
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center overflow-hidden">
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[952px] w-[95%] lg:w-full mx-auto overflow-visible px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between font-sans"
          >
            {/* Image */}
            <div className="absolute -top-24 md:-top-28 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 flex justify-center md:justify-start w-full md:w-auto z-0">
              <Image
                src={Cart}
                alt="Mailbox illustration"
                width={450}
                height={450}
                className="w-[250px] sm:w-[250px] md:w-[420px] lg:w-[450px] h-auto object-contain"
                priority
              />
            </div>

            {/* Text */}
            <div className="mt-32 md:mt-0 md:ml-[340px] lg:ml-[380px] flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 w-full px-4 md:px-0">
              <h2 className="text-2xl sm:text-3xl md:text-[30px] font-[600] leading-snug max-w-[520px]">
                Contact us for purchasing
              </h2>

              <form className="flex relative items-center bg-[#2D0C00] rounded-full px-2 sm:px-3 py-2 gap-2 w-full max-w-[500px] justify-between overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow min-w-0 text-white placeholder-gray-300 z-30 bg-transparent outline-none text-sm md:text-base px-2"
                />
                <button
                  type="submit"
                  className="bg-white text-[#282828] text-xs sm:text-sm md:text-base cursor-pointer px-3 sm:px-5 py-1 sm:py-1.5 rounded-full font-medium hover:bg-gray-200 transition flex-shrink-0"
                >
                  Submit
                </button>
              </form>

              <p className="text-sm sm:text-base md:text-[18px] text-white/80 font-[500]">
                Interested in unlocking valuable insights for your business?
                Contact us today to explore and purchase our comprehensive
                report.
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-4 text-white text-2xl cursor-pointer hover:opacity-70"
            >
              ×
            </button>
          </motion.section>
        </div>
      )}
    </section>
  );
}