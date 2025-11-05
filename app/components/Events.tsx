"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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

  // === Fetch Events ===
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // === Pagination Logic ===
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInterviews = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <div className="relative top-30 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 space-y-6">
        <div className="inline-flex items-center justify-center border border-[#E8602E] px-4 py-2 rounded-full font-medium tracking-wide bg-transparent glow-orange3">
          <p className="whitespace-nowrap text-sm sm:text-base md:text-[20px]">
            🔥Where Insight Meets Experience
          </p>
        </div>

        <h1 className="font-[400] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[80px] max-w-[90%]">
          Engaging <span className="text-[#E8602E]">Insights</span>
        </h1>

        <p className="text-white text-xs sm:text-sm md:text-base lg:text-[20px] max-w-[90%] sm:max-w-[700px] leading-relaxed">
          The Business Insight organizes frequent round table discussions and
          events, gathering key stakeholders to tackle pressing matters. We not
          only attend but also collaborate with chosen organizers of industry
          conferences to present you with premier networking and
          knowledge-sharing opportunities.
        </p>
      </div>

      {/* === Events Section === */}
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

        <section className="relative h-[1925px] mb-80 w-[90%] justify-center m-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] top-20 border-white/10">
          {/* === Event Cards === */}
          <div className="relative grid grid-cols-1 gap-[42px] mt-10">
            {currentInterviews.map((event) => (
              <section
                key={event.id}
                className="flex flex-col md:flex-row items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative w-full lg:w-[633px] h-[200px] lg:h-[413px] bg-black">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover p-2 rounded-[30px]"
                    priority
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center p-6 w-full md:w-[60%] text-white font-sans">
                  <p className="text-white text-[20px] mb-2 italic">
                    {event.year} • {event.state}, {event.country}
                  </p>
                  <h2 className="text-[22px] md:text-[30px] font-semibold mb-2">
                    {event.name}
                  </h2>
                  <p className="text-white text-[20px] mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E8602E] hover:bg-[#ff6f3f] text-white font-medium px-[37px] w-fit py-[13px] rounded-md transition-all duration-200"
                  >
                    Attend
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
