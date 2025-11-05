"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { ArticleBg, InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Footer from "./Footer";

interface Article {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Responsive pagination setup
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(4); // mobile
      else if (window.innerWidth < 1024) setItemsPerPage(8); // tablet
      else setItemsPerPage(10); // desktop
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch filter options
  useEffect(() => {
    fetch("http://localhost:5000/api/filters")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries || []);
        setSectors(data.sectors || []);
        setYears(data.years || []);
      })
      .catch((err) => console.error("Error fetching filters:", err));
  }, []);

  // Fetch articles
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

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
      {/* Background Image */}
      <div className="absolute h-screen inset-0">
        <Image
          src={ArticleBg}
          alt="Interview background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative top-30 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-40 space-y-6">
        <div
          className="inline-flex items-center justify-center 
            w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
            border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
            px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3"
        >
          <p className="whitespace-nowrap font-sans">✨ Ideas That Move Markets</p>
        </div>

        <h1
          className="font-[400] leading-tight 
            text-3xl sm:text-4xl md:text-5xl lg:text-[80px] 
            max-w-[90%] sm:max-w-[650px] md:max-w-[743px] lg:w-[743px]"
        >
          Insight That <span className="text-[#E25B2B]">Shapes Tomorrow.</span>
        </h1>

        <p
          className="text-white text-xs sm:text-sm md:text-base lg:text-[20px] font-sans 
            max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl 
            leading-relaxed"
        >
          The Business Insight delivers bold perspectives, market intelligence,
          and stories that drive transformation across the world.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex relative top-50 ml-10 items-center justify-start w-64 h-9 px-3 rounded-md border border-orange-600/40 bg-orange-950/10 backdrop-blur-sm focus-within:border-orange-500/70 transition-all duration-200">
        <Search className="w-4 h-4 text-orange-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-500/60"
        />
        <SlidersHorizontal
          className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors"
          onClick={() => setShowFilters((prev) => !prev)}
        />
        {showFilters && (
          <div className="absolute top-12 left-0 w-full bg-[#1c1c1c] border border-orange-900/30 rounded-lg shadow-lg p-4 z-50 space-y-3">
            <div>
              <label className="block text-sm text-orange-400 mb-1">Country</label>
              <select className="w-full bg-[#2b2b2b] border border-gray-700 rounded p-2 text-sm">
                <option value="">All</option>
                {countries.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-orange-400 mb-1">Sector</label>
              <select className="w-full bg-[#2b2b2b] border border-gray-700 rounded p-2 text-sm">
                <option value="">All</option>
                {sectors.map((sector, i) => (
                  <option key={i} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-orange-400 mb-1">Year</label>
              <select className="w-full bg-[#2b2b2b] border border-gray-700 rounded p-2 text-sm">
                <option value="">All</option>
                {years.map((year, i) => (
                  <option key={i} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <section>
        <div className="absolute -top-20 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        {/* Main Section */}
        <section
          className="relative w-[90%] top-50 mb-120 mx-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 
          bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] mt-20 border-white/10 h-auto"
        >
          <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-sans font-[500]">
            Articles
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] font-sans font-[500]">
            Explore our latest articles and insights for a fresh perspective on
            industry trends and news.
          </p>

          {/* PAGINATED GRID */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[42px] mt-10 transition-all duration-500">
            {currentArticles.map((article) => (
              <section key={article.id} className="relative">
                <div className="relative">
                  <Image
                    src={article.image_url}
                    alt={article.name}
                    width={633}
                    height={413}
                    className="object-cover rounded-md w-full h-auto"
                    priority
                  />
                  <div className="absolute bottom-3 left-3 text-white text-xs md:text-sm px-3 py-1">
                    {(Array.isArray(article.sector)
                      ? article.sector
                      : [article.sector]
                    ).map((sector, i) => (
                      <span
                        key={i}
                        className="text-orange-400 text-xs font-medium px-3 py-1 mx-1 bg-black/60 rounded-full border border-orange-600/40"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 space-y-1 py-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-[14px] md:text-[16px] font-sans font-[400] text-white/70">
                      {Array.isArray(article.country)
                        ? article.country.join(", ")
                        : article.country}
                    </p>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <p className="text-[14px] md:text-[16px] font-sans font-[400] text-white/70">
                      {article.year}
                    </p>
                  </div>
                  <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-sans font-[500] text-white">
                    {article.name}
                  </h2>
                  <a
                    href={article.link}
                    className="text-orange-500 hover:underline"
                  >
                    Read more <ArrowUpRight className="inline-block w-4 h-4 ml-1" />
                  </a>
                </div>
              </section>
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
        </section>
      </section>

      {/* Left glow */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
        bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
        blur-3xl pointer-events-none z-0"
      />

      <Footer />
    </section>
  );
};

export default Articles;
