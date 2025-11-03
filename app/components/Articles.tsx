"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

interface Article {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
    const [showFilters, setShowFilters] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Fetch filter options from backend
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

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching articles:", err));
      console.log("FormData being sent:", FormData);
  }, []);

  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}
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

      {/* Hero Content */}
      <div className="relative top-30 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-40 space-y-6">
        {/* Tagline */}
        <div
          className="inline-flex items-center justify-center 
                        w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
                        border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
                        px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3"
        >
          <p className="whitespace-nowrap">✨Ideas That Move Markets</p>
        </div>

        {/* Heading */}
        <h1
          className="font-[400] leading-tight 
                       text-3xl sm:text-4xl md:text-5xl lg:text-[80px] 
                       max-w-[90%] sm:max-w-[650px] md:max-w-[743px] lg:w-[743px]"
        >
          Insight That <span className="text-[#E25B2B]">Shapes Tomorrow.</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg 
                      max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl 
                      leading-relaxed"
        >
          The Business Insight delivers bold perspectives, market intelligence, and stories that drive transformation across the world.
        </p>
      </div>
      <div className="flex relative top-50 ml-10 items-center justify-start w-64 h-9 px-3 rounded-md border border-orange-600/40 bg-orange-950/10 backdrop-blur-sm focus-within:border-orange-500/70 transition-all duration-200">
        <Search className="w-4 h-4 text-orange-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-500/60"
        />
        <SlidersHorizontal className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors" 
        onClick={() => setShowFilters((prev) => !prev)}/>
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
        <div className="absolute -top-160 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section
          className="h-[3628px] relative w-[90%] justify-center m-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 
  bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] top-10 lg:top-120 border-white/10"
        >
          <h1 className="text-[60px] font-sans font-[500]">
            Articles
          </h1>
          <p className="text-[20px] font-sans font-[500]">
            Explore our latest articles and insights for a fresh perspective on industry trends and news.
          </p>

          <div className="relative grid grid-cols-1 gap-[42px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-10">
            {articles.map((article) => (
              <section key={article.id} className="relative">
                <div className="relative">
                  <Image
                    src={article.image_url}
                    alt={article.name}
                    width={633}
                    height={413}
                    className="object-cover rounded-md"
                    priority
                  />

                  {/* Overlay text inside the image */}
                  <div className="absolute bottom-3 left-3 bg-black/20 text-white text-xs md:text-sm px-3 py-1 rounded-md border border-orange-500">
                    {article.sector}
                  </div>
                </div>

                <div className="mt-3 space-y-1 py-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-[14px] md:text-[16px] font-sans font-[400] text-white/70">
                      {article.description}
                    </p>

                    {/* Small orange dot separator */}
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />

                    <p className="text-[14px] md:text-[16px] font-sans font-[400] text-white/70">
                      {article.year}
                    </p>
                  </div>
                  <h2 className="text-[24px] w-[514px] font-sans font-[500] text-white">
                    {article.name}
                  </h2>
                  <a href={article.link} className="text-orange-500 hover:underline">
                    Read more <ArrowUpRight className="inline-block w-4 h-4 ml-1" />
                  </a>
                </div>
              </section>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
};

export default Articles;
