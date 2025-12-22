"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Cart, ReportBg, thirdOrange, vector2 } from "@/public";
import { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import SortBy from "./SortBy";
import { Search } from "lucide-react";
import SearchAndFilter from "./SearchFilter";

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
            className={`px-2 py-1 ${currentPage === i ? "text-orange-500 font-bold" : "text-gray-400"
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
          Browse our latest publications and gain a deeper understanding of emerging trends and critical topics through our in-depth analysis, interviews with local business and political leaders and comprehensive data and statistics.
        </p>
      </div>
      <div className="relative items-baseline md:flex md:gap-3 lg:gap-12 font-sans w-[100%] mx-auto px-4 md:px-0 md:pr-6 lg:pr-12 items-baseline py-10">
        <div className=" items-baseline">
          <SortBy data={reports} onFiltered={handleFiltered} />
          <div className="relative justify-start z-50">
            <SearchAndFilter
              data={reports}
              onFiltered={handleFiltered}
              fields={{
                search: ["sector", "year"],
                filters: { year: "year", country: "country", sector: "sector" },
              }}
            />
          </div>
        </div>
        <div>

          <h1 className="text-[clamp(1.8rem,5vw,3.5rem)] font-[500] mt-7 md:mt-0 mb-6">Reports</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 mx-auto gap-5 w-full">
            {currentReports.map((item) =>
            (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className=" w-full h-full bg-black border border-gray-600/40 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           25vw"
                  />
                </div>

                <div className="p-3 flex justify-between items-start mt-auto">
                  <div className="flex-1 pr-2">
                    <p className="text-white max-w-[90%] font-semibold text-[1.1rem] leading-tight">
                      {item.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-400 text-[15px] line-through">
                      ${item.discounted_price}
                    </p>
                    <p className="text-[#E25B2B] text-sm">${item.price}</p>
                  </div>
                </div>
              </motion.div>
            )
            )
            }
          </div>
        </div>

        {/* Sort & Filter */}

      </div>

      {/* Report Grid */}
      <section className="relative w-[90%] mx-auto py-10 bg-white/5 backdrop-blur-2xl rounded-[20px] mt-10">


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
