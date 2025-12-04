"use client";

import { Cart } from "@/public";
import { motion } from "framer-motion";
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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Fetch from backend
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    

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

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#0B0B0D] text-white py-20 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
          <div>
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold">
              Featured Reports
            </h2>
            <p className="text-gray-300 text-[1.1rem] mt-2">
              Essential insights on key trends and leadership.
            </p>
          </div>

          <Link href="/reports">
            <motion.button
              whileHover={{ scale: 1.04 }}
              className="bg-[#E8602E] text-white px-7 py-3 rounded-xl font-medium flex items-center gap-2"
            >
              View All Reports →
            </motion.button>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="flex space-x-8 overflow-x-auto scrollbar-none scroll-smooth pb-4"
          >
            {reports.slice(0, 9).map((item) => (
              <motion.div
                onClick={() => setSelectedReport(item)}
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="min-w-[260px] max-w-[260px] bg-[#111113] border border-gray-600/40 rounded-xl shadow-lg overflow-hidden"
              >
                <Link href={item.link}>
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
                        <p className="text-gray-400 text-[15px] line-through  mt-1">
                      ${item.discounted_price}
                    </p>
                    <p className="text-red-400 text-sm mt-1">
                      ${item.price}
                    </p>
                    </div>
                    
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Left Button */}
         <div className="bg-black/50">
             <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
            bg-black/30 backdrop-blur-md border border-white/20 text-white
            w-12 h-12 rounded-full items-center justify-center hover:bg-white/20 transition"
          >
            ←
          </button>
         </div>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
            bg-black/30 backdrop-blur-md border border-white/20 text-white
            w-12 h-12 rounded-full items-center justify-center hover:bg-white/20 transition"
          >
            →
          </button>
        </div>
      </div>
      {selectedReport && (
                      <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center overflow-hidden">
                        <motion.section
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          key="Newsletter"
                          className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[952px] h-fit w-[95%] lg:w-full mx-auto overflow-visible px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between font-sans"
                        >
                          {/* Mailbox Image */}
                          <div className="absolute -top-16 sm:-top-20 md:-top-24 lg:-top-28 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 flex justify-center md:justify-start w-full md:w-auto z-0">
                            <Image
                              src={Cart}
                              alt="Mailbox illustration"
                              width={450}
                              height={450}
                              className="w-[250px] sm:w-[250px] md:w-[420px] z-0 lg:w-[450px] h-auto object-contain"
                              priority
                            />
                          </div>
              
                          {/* Text & Form Wrapper */}
                          <div className="mt-32 sm:mt-36 md:mt-0 md:ml-[340px] lg:ml-[380px] flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 w-full px-4 md:px-0">
                            <h2 className="text-2xl sm:text-3xl md:text-[30px] font-[600] leading-snug max-w-[520px]">
                              Contact us for purchasing
                            </h2>
              
                            <form className="flex relative items-center bg-[#2D0C00] rounded-full px-2 sm:px-3 py-2 gap-2 w-full max-w-[500px] justify-between overflow-hidden">
                              {/* Icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="flex-shrink-0 hidden xs:block"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.5 6C8.189 6 5.5 8.689 5.5 12C5.5 15.311 8.189 18 11.5 18C14.811 18 17.5 15.311 17.5 12C17.5 8.689 14.811 6 11.5 6ZM11.5 8C13.708 8 15.5 9.792 15.5 12C15.5 14.208 13.708 16 11.5 16C9.292 16 7.5 14.208 7.5 12C7.5 9.792 9.292 8 11.5 8Z"
                                  fill="white"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.25 17L19.343 16.999C20.304 16.975 21.22 16.583 21.902 15.902C22.605 15.198 23 14.245 23 13.25V11C23 5.52 18.592 1.07 13.129 1.001L13 1H12C5.929 1 1 5.929 1 12C1 18.071 5.929 23 12 23C12.552 23 13 22.552 13 22C13 21.448 12.552 21 12 21C7.033 21 3 16.967 3 12C3 7.033 7.033 3 12 3H13C17.418 3 21 6.582 21 11V13.25C21 13.714 20.816 14.159 20.487 14.487C20.159 14.816 19.714 15 19.25 15M19.25 15C18.786 15 18.341 14.816 18.013 14.487C17.684 14.159 17.5 13.714 17.5 13.25V8C17.5 7.465 17.08 7.028 16.551 7.001L16.5 7C15.948 7 15.5 7.448 15.5 8C15.5 8 15.5 10.935 15.5 13.25C15.5 14.245 15.895 15.198 16.598 15.902C17.302 16.605 18.255 17 19.25 17"
                                  fill="white"
                                />
                              </svg>
              
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
                              report, tailored to meet your specific needs and drive informed
                              decision-making.
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
