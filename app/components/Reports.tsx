"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Cart, InterviewBg, ReportBg, thirdOrange, vector2 } from "@/public";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Footer from "./Footer";
import SearchAndFilter from "./SearchFilter";
import SortBy from "./SortBy";

interface Report {
  id: number;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filteredInterviews, setFilteredInterviews] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [sortOption, setSortOption] = useState<string>("");

  // ✅ Memoize the handler so SearchAndFilter doesn’t trigger infinite re-renders
  const handleFiltered = useCallback((filtered: Report[]) => {
    setFilteredInterviews(filtered);
  }, []);

  // ✅ Fetch data from your backend
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

  // ✅ Sort client-side after fetching
  useEffect(() => {
    if (!sortOption) return;

    const sortedReports = [...reports].sort((a, b) => {
      if (sortOption === "price_asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === "price_desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortOption === "title_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "title_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setCurrentPage(1);

    setReports(sortedReports);
  }, [sortOption]);

  // ✅ Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6); // tablet
      } else {
        setItemsPerPage(12); // desktop
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (selectedReport) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedReport, currentPage]);

  // ✅ Pagination calculations
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = reports.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
      {/* === Background === */}
      <div className="absolute h-screen inset-0">
        <Image
          src={ReportBg}
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
      <div className="relative h-screen top-6 lg:top-11 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 space-y-2 lg:space-y-6">
        <div className="inline-flex items-center justify-center w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3">
          <p className="whitespace-nowrap font-sans">
            📈 Where Analysis Meets Opportunity
          </p>
        </div>

        <h1 className="font-[400] leading-tight text-[36px] md:text-[60px] lg:text-[80px] max-w-[90%] sm:max-w-[650px] md:max-w-[800px] lg:w-[975px]">
          Reports
        </h1>

        <p className="text-white text-[18px] lg:text-[20px] max-w-[99%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl leading-relaxed font-sans">
          Browse our latest publications and gain a deeper understanding of
          emerging trends and critical topics through our in-depth analysis,
          interviews with local business and political leaders, and
          comprehensive data and statistics.
        </p>
      </div>

      {/* === Search Bar === */}
      {/* === Search + Sort === */}
      <div className="relative z-50 flex flex-col sm:flex-row items-center justify-between gap-4 w-[90%] mx-auto mt-5">
        <SortBy onChange={(value) => setSortOption(value)} />
      </div>

      {/* === Content === */}
      <section>
        <div className="relative -top-130 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section
          className="relative mb-70 w-[90%] justify-center m-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 
          bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] top-10 lg:top-25 border-white/10"
        >
          {/* === Grid of Reports === */}
          {/* === Grid of Reports === */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 font-sans gap-14 mt-10">
            {(filteredInterviews.length > 0
              ? filteredInterviews
              : currentReports
            ).map((report) => (
              <section
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="group relative bg-white/3 hover:bg-white/5 transition-all rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:scale-105 duration-300"
              >
                {/* === Image === */}
                <div
                  className="
    relative 
    w-full 
    h-[340px] sm:h-[360px] lg:h-[380px] 
    bg-[#0F0F0F] 
    rounded-xl 
    border border-white/10 
    shadow-[0_0_20px_rgba(255,255,255,0.05)] 
    overflow-hidden 
    flex items-center justify-center
    p-4
    group
  "
                >
                  <Image
                    src={report.image_url}
                    alt={report.title}
                    fill
                    className="
      object-contain
      transition-transform duration-500
      group-hover:scale-[1.03]
    "
                    priority
                  />
                </div>

                {/* === Text Section === */}
                <div className="p-1 sm:p-2 flex flex-col justify-between h-[calc(100%-auto)]">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 line-clamp-2">
                    {report.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                      <span className="text-[#E8602E] font-bold text-lg sm:text-xl">
                        ${report.price}.00
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        ${report.discounted_price}.00
                      </span>
                    </div>

                    <a
                      onClick={() => setSelectedReport(report)}
                      className="text-[#E8602E] hover:underline flex items-center gap-1 text-sm sm:text-base"
                    >
                      Explore
                      <Image src={vector2} alt="arrow" width={15} height={15} />
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* === Pagination === */}
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

        {/* === Glow Effect === */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
            bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
            blur-3xl pointer-events-none z-0"
        />
      </section>

      {selectedReport && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center overflow-hidden">
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key="Newsletter"
            className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[952px] h-fit w-full mx-auto overflow-visible px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between font-sans"
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
                  className="bg-white text-[#282828] text-xs sm:text-sm md:text-base px-3 sm:px-5 py-1 sm:py-1.5 rounded-full font-medium hover:bg-gray-200 transition flex-shrink-0"
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
              className="absolute top-3 right-4 text-white text-2xl hover:opacity-70"
            >
              ×
            </button>
          </motion.section>
        </div>
      )}

      {/* === Footer === */}
      <Footer />
    </section>
  );
};

export default Reports;
