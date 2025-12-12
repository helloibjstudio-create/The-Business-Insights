"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Cart, ReportBg, thirdOrange, vector2 } from "@/public";
import { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import SortBy from "./SortBy";
import { Search } from "lucide-react";

interface Report {
  id: number;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
  country?: string;
  sector?: string;
  year?: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [query, setQuery] = useState("");

  const handleFiltered = useCallback((filtered: Report[]) => {
    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/reports`);
        const data = await res.json();
        setReports(data);
        setFilteredReports(data); // Initial state
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

    useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const searchedReports = reports.filter((r) => r.title.toLowerCase().includes(lowerQuery));
    setFilteredReports(searchedReports);
    setCurrentPage(1);
  }, [query, reports]);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 1024) setItemsPerPage(6);
      else setItemsPerPage(12);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
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
      } else if ((i === currentPage - 3 && i > 1) || (i === currentPage + 3 && i < totalPages)) {
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
      {/* Background */}
      <div className="absolute h-screen inset-0">
        <Image src={ReportBg} alt="Reports background" fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>

      <Navbar />

      {/* Hero */}
      <div className="relative h-screen z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-20 space-y-4">
        <div className="inline-flex items-center justify-center w-full max-w-[582px] border border-[#E8602E] text-white px-4 py-2 rounded-full backdrop-blur-md glow-orange3">
          <p>📈 Where Analysis Meets Opportunity</p>
        </div>
        <h1 className="text-[60px] font-[400] leading-tight max-w-[975px]">Reports</h1>
        <p className="text-white text-lg max-w-3xl leading-relaxed">
          Browse our latest publications and gain a deeper understanding of emerging trends and critical topics through our in-depth analysis, interviews with local business and political leaders and comprehensive data and statistics. ​
        </p>
      </div>
      <div className="w-[90%] max-w-3xl mx-auto mt-5">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <Search className="text-white w-5 h-5 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            className="bg-transparent outline-none flex-1 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Sort & Filter */}
      <SortBy data={reports} onFiltered={handleFiltered} />

      {/* Report Grid */}
      <section className="relative w-[90%] mx-auto py-10 bg-white/5 backdrop-blur-2xl rounded-[20px] mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {currentReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="group bg-white/3 hover:bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-white/10 transition-transform hover:scale-105"
            >
              <div className="relative w-full h-[360px] bg-[#0F0F0F] rounded-xl flex items-center justify-center p-4">
                <Image src={report.image_url} alt={report.title} fill className="object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-semibold line-clamp-2">{report.title}</h2>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-[#E8602E] font-bold">${report.price}</span>
                    <span className="text-gray-400 line-through">${report.discounted_price}</span>
                  </div>
                  <a className="text-[#E8602E] hover:underline flex items-center gap-1">
                    Explore <Image src={vector2} alt="arrow" width={10} height={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button onClick={() => handlePageChange(1)} className="text-gray-400 hover:text-orange-400">First</button>
          <button onClick={() => handlePageChange(currentPage - 1)} className="text-gray-400 hover:text-orange-400">Prev</button>
          {renderPageNumbers()}
          <button onClick={() => handlePageChange(currentPage + 1)} className="text-gray-400 hover:text-orange-400">Next</button>
          <button onClick={() => handlePageChange(totalPages)} className="text-gray-400 hover:text-orange-400">Last</button>
        </div>
      </section>

      {/* Selected Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[950px] w-[95%] mx-auto p-10 flex flex-col md:flex-row items-center md:items-start"
          >
            <Image src={Cart} alt="cart" width={450} height={450} className="md:w-[420px] w-[250px] h-auto object-contain" />
            <div className="md:ml-10 mt-6 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <h2 className="text-3xl font-semibold">Contact us for purchasing</h2>
              <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-full text-black w-full max-w-[400px]" />
              <button className="bg-white text-[#282828] px-5 py-2 rounded-full font-medium hover:bg-gray-200 mt-2">Submit</button>
            </div>
            <button onClick={() => setSelectedReport(null)} className="absolute top-3 right-4 text-2xl hover:opacity-70">×</button>
          </motion.div>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default Reports;
