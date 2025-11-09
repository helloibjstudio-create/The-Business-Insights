"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import Footer from "./Footer";

interface Events {
  id: number;
  name: string;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
  country: string;
  year: string;
  description: string;
  state: string;
}

const ITEMS_PER_PAGE = 4;

const Events = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Get base URL from environment or fallback to local
 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/events`);
        if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("❌ Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInterviews = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      {/* Background */}
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

      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen top-2 lg:top-7 z-30 flex flex-col items-center justify-center text-center px-6  space-y-6">
        <div className="inline-flex items-center justify-center 
            w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
            border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
            px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3">
          <p className="whitespace-nowrap font-sans">🔥 Where Insights Meet Experiences</p>
        </div>

        <h1 className="font-[400] leading-tight text-4xl md:text-6xl lg:text-[80px] max-w-[90%]">
          Engaging <span className="text-[#E8602E]">Insights</span>
        </h1>

        <p className="text-white text-sm md:text-lg max-w-[700px] leading-relaxed">
          The Business Insight organizes frequent round table discussions and
          events, gathering key stakeholders to tackle pressing matters...
        </p>
      </div>

      {/* Events Section */}
      <section className="relative top-20">
        <div className="absolute -top-20 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section className="relative w-[90%] mx-auto z-20 text-white py-10 px-6 md:px-12 lg:px-20 bg-white/5 backdrop-blur-2xl border mb-70 font-sans border-white/10 rounded-2xl top-20">
          <div className="grid grid-cols-1 gap-[42px] mt-10">
            {currentInterviews.map((event) => (
              <section
                key={event.id}
                className="flex flex-col md:flex-row items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative w-full lg:w-[633px] h-[250px] lg:h-[413px] bg-black">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover p-2 rounded-[30px]"
                    priority
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center p-6 w-full md:w-[60%]">
                  <p className="text-white text-[18px] mb-2 italic">
                    {event.year} • {event.state}, {event.country}
                  </p>
                  <h2 className="text-[24px] font-semibold mb-2">{event.name}</h2>
                  <p className="text-white text-[18px] mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E8602E] hover:bg-[#ff6f3f] text-white font-medium w-fit px-[37px] py-[13px] rounded-md transition-all duration-200"
                  >
                    Attend
                  </a>
                </div>
              </section>
            ))}
          </div>

          {/* Pagination */}
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

        {/* Orange Glow */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] blur-3xl pointer-events-none z-0"
        />
      </section>

      <Footer />
    </section>
  );
};

export default Events;
