"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg } from "@/public";
import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Footer from "./Footer";
import SearchAndFilter from "./SearchFilter";

interface Interview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  write_up?: string;
}

const ITEMS_PER_PAGE = 8;

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);

  // ✅ Memoize the handler so SearchAndFilter doesn’t trigger infinite re-renders
  const handleFiltered = useCallback((filtered: Interview[]) => {
    setFilteredInterviews(filtered);
  }, []);

  // Fetch all interviews
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews`)
      .then((res) => res.json())
      .then((data) => {
        setInterviews(data);
        setFilteredInterviews(data); // set initially
      })
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  const totalPages = Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentInterviews = filteredInterviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

  // ====== DETAIL VIEW ======
  if (selectedInterview) {
    return (
      <section className="bg-black text-white min-h-screen">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <button
            onClick={() => setSelectedInterview(null)}
            className="flex items-center text-orange-400 mb-10 hover:text-orange-500 transition"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to interviews
          </button>

          <div className="flex flex-col-reverse bg-white/3 backdrop-blur-2xl border-[0.5px] border-white/10 p-6 rounded-[20px] lg:flex-row font-sans gap-10">
            <div className="w-full">
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                {selectedInterview.name}
              </h1>

              <div className="space-y-6 text-white font-sans font-normal leading-relaxed">
                <p>{selectedInterview.description}</p>
                {selectedInterview.write_up ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedInterview.write_up,
                    }}
                  />
                ) : (
                  <>
                    <p>
                      Can you please give us an introduction to{" "}
                      {selectedInterview.name} and its role in the{" "}
                      {selectedInterview.country} market?
                    </p>
                    <p>
                      What sets apart the {selectedInterview.country} industry
                      from the rest of the region?
                    </p>
                    <p>
                      How do you assess the current {selectedInterview.country}{" "}
                      market?
                    </p>
                    <p>
                      What do you anticipate as the aftermath of recent global
                      events in your sector?
                    </p>
                  </>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] font-sans rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={selectedInterview.image_url}
                alt={selectedInterview.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-orange-500 p-6 w-full md:w-[85%] text-white rounded-tr-2xl">
                <p className="text-sm opacity-80 uppercase mb-1">
                  {selectedInterview.sector}
                </p>
                <h3 className="text-xl font-semibold">
                  {selectedInterview.name}
                </h3>
                <p className="text-sm mt-2 opacity-80">
                  {selectedInterview.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Related section */}
          <div className="mt-20 font-sans">
            <h2 className="text-2xl mb-6 font-semibold">
              You may also be interested in...
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredInterviews
                .filter((item) => item.id !== selectedInterview.id)
                .slice(0, 2)
                .map((related) => (
                  <div
                    key={related.id}
                    onClick={() => setSelectedInterview(related)}
                    className="cursor-pointer bg-[#111] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
                  >
                    <div className="relative w-full h-[240px]">
                      <Image
                        src={related.image_url}
                        alt={related.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold mb-1">
                        {related.name}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        {related.sector}
                      </p>
                      <span className="text-orange-400 hover:underline text-sm">
                        Read More →
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </section>
    );
  }

  // ====== MAIN LIST VIEW ======
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute h-screen inset-0 z-0 pointer-events-none">
        <Image
          src={InterviewBg}
          alt="Interview background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>

      <Navbar />

      {/* Hero */}
      <div className="relative h-screen z-30 flex flex-col items-center justify-center text-center px-4 top-30">
        <div
          className="inline-flex items-center justify-center 
            w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
            border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
            px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3"
        >
          <p className="whitespace-nowrap font-sans">✨ Voices Behind Change</p>
        </div>
        <h1 className="text-[36px] md:text-[60px] lg:text-[80px] max-w-[875px] font-[400] leading-[36px] md:leading-[60px] lg:leading-[72px] mt-6">
          Exclusive Interviews with{" "}
          <span className="text-[#E25B2B]">Leaders & Innovators</span>
        </h1>
        <p className="mt-4 font-sans text-[18px] lg:text-[20px] max-w-[850px] text-white">
          Dive into conversations that shape industries, nations and futures.
          From business visionaries to policy makers, our interviews bring you
          first-hand perspectives on what’s next.
        </p>
      </div>

      {/* ✅ FIXED SearchAndFilter */}
      <div className="relative z-50">
        <SearchAndFilter
          data={interviews}
          onFiltered={handleFiltered}
          fields={{
            search: ["name", "description", "sector", "year"],
            filters: { year: "year", country: "country", sector: "sector" },
          }}
        />
      </div>

      {/* Grid */}
      <div className="relative font-sans w-[90%] mx-auto mt-40 py-10">
        <h1 className="text-[50px] font-[500] mb-2">Exclusive Interviews</h1>
        <p className="text-[18px] text-gray-300 mb-10">
          Unlock the insights of industry leaders
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-[42px]">
          {currentInterviews.map((interview) => (
            <div
              key={interview.id}
              onClick={() => setSelectedInterview(interview)}
              className="cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={interview.image_url}
                  alt={interview.name}
                  width={633}
                  height={413}
                  className="object-cover rounded-md w-full h-auto"
                />
                <div className="absolute bottom-3 left-3 bg-black/30 text-white text-xs px-3 py-1 rounded-md border border-orange-500">
                  {interview.sector}
                </div>
              </div>

              <div className="mt-3 space-y-1 py-2">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-400">{interview.country}</p>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <p className="text-sm text-gray-400">{interview.year}</p>
                </div>
                <h2 className="text-[28px] font-[500]">{interview.name}</h2>
                <span className="text-orange-500 hover:underline text-lg flex items-center">
                  Read more <ArrowUpRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-10 text-sm flex-wrap">
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
      </div>

      <Footer />
    </section>
  );
};

export default Interviews;
