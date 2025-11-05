"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "./Footer";

interface Report {
  id: number;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
}

const ITEMS_PER_PAGE = 9;

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInterviews = reports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 ${
              currentPage === i ? "text-orange-500 font-bold" : "text-gray-400"
            } hover:text-orange-400 transition`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 3 && i > 1) ||
        (i === currentPage + 3 && i < totalPages)
      ) {
        pages.push(
          <span key={`dots-${i}`} className="text-gray-500">
            ...
          </span>
        );
      }
    }
    return pages;
  };
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* === Background Image === */}
      <div className="absolute h-screen inset-0">
        <Image
          src={InterviewBg}
          alt="Interview background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>

      {/* === Navbar === */}
      <Navbar />

      {/* === Hero Section === */}
      <div className="relative h-screen top-10 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 space-y-6">
        <div className="inline-flex items-center justify-center w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3">
          <p className="whitespace-nowrap">✨Ideas That Move Markets</p>
        </div>

        <h1 className="font-[400] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[80px] max-w-[90%] sm:max-w-[650px] md:max-w-[800px] lg:w-[975px]">
          Reports
        </h1>

        <p className="text-white text-xs sm:text-sm md:text-base lg:text-[20px] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl leading-relaxed font-sans">
          Browse our latest publications and gain a deeper understanding of
          emerging trends and critical topics through our in-depth analysis,
          interviews with local business and political leaders and comprehensive
          data and statistics.
        </p>
      </div>

      {/* === Search Bar === */}
      <div className="flex relative top-50 ml-10 items-center justify-start w-64 sm:w-80 md:w-96 h-9 px-3 rounded-md border border-orange-600/40 bg-orange-950/10 backdrop-blur-sm focus-within:border-orange-500/70 transition-all duration-200">
        <Search className="w-4 h-4 text-orange-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-500/60"
        />
        <SlidersHorizontal className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors" />
      </div>

      {/* === Content Section === */}
      <section>
        <div className="absolute -top-130 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section
          className="relative h-[2365px] mb-120 w-[90%] justify-center m-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 
          bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] top-20 lg:top-65 border-white/10"
        >
          {/* === Grid of Reports === */}
          <div className="relative grid grid-cols-1 gap-[42px] sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {currentInterviews.map((report) => (
              <section
                key={report.id}
                className="relative bg-transparent text-white font-sans"
              >
                <div className="relative">
                  <Image
                    src={report.image_url}
                    alt={report.title}
                    width={633}
                    height={413}
                    className="object-cover rounded-md shadow-lg"
                    priority
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-[22px] md:text-[26px] font-medium">
                      {report.title}
                    </h2>
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[#E8602E] font-[600] text-[26px] font-semibold">
                        ${report.price}.00
                      </span>
                      <span className="text-white font-[500] line-through text-[18px]">
                        ${report.discounted_price}.00
                      </span>
                    </div>
                  </div>

                  <a
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#E8602E] hover:text-white font-medium transition-colors underline duration-200"
                  >
                    Explore Now
                    <ArrowUpRight className="inline-block w-5 h-5 ml-1" />
                  </a>
                </div>
              </section>
            ))}
          </div>

          {/* === Pagination Controls === */}
          <div className="flex justify-center items-center space-x-2 mt-10 text-sm">
            <button
              onClick={() => handlePageChange(1)}
              className="text-gray-400 hover:text-orange-400 transition"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-gray-400 hover:text-orange-400 transition"
            >
              Prev
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-gray-400 hover:text-orange-400 transition"
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="text-gray-400 hover:text-orange-400 transition"
            >
              Last
            </button>
          </div>
        </section>

        {/* === Gradient Glow Effect === */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
            bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
            blur-3xl pointer-events-none z-0"
        />
      </section>

      {/* === Footer === */}
      <Footer />
    </section>
  );
};

export default Reports;
