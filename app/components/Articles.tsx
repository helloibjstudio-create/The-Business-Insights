"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { ArticleBg, thirdOrange, vector2 } from "@/public";
import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "./Footer";
import SearchAndFilter from "./SearchFilter";

interface Article {
  id: number;
  name: string;
  sector: string | string[];
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  write_up: string;
}

const ITEMS_PER_PAGE = 8;

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    useEffect(() => {
  if (selectedArticle) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [selectedArticle]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all articles
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = useMemo(
    () => filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredArticles, startIndex]
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

  // ===== DETAIL VIEW =====
  if (selectedArticle) {
    return (
      <section className="bg-black text-white min-h-screen ">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-orange-400 mb-10 hover:text-orange-500 font-sans transition"
          >
            <ArrowLeft className="mr-2 w-4 h-4 font-sans" /> Back to articles
          </button>

          <div className="flex flex-col-reverse bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[20px] font-sans gap-10">
            {/* Text section */}
            <div className="w-full">
              <h1 className="text-[26px] md:text-4xl font-semibold mb-6">
                {selectedArticle.name}
              </h1>
              <div className="space-y-1 text-white font-normal leading-relaxed">
                <p>{selectedArticle.description}</p>

                {selectedArticle.write_up ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedArticle.write_up,
                    }}
                  />
                ) : (
                  <p>Post not yet ready…</p>
                )}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[250px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={selectedArticle.image_url}
                alt={selectedArticle.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Related Articles */}
          <div className="mt-20 font-sans">
            <h2 className="text-2xl mb-6 font-semibold font-sans">
              You may also be interested in...
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {articles
                .filter((item) => item.id !== selectedArticle.id)
                .slice(0, 2)
                .map((related) => (
                  <div
                    key={related.id}
                    onClick={() => setSelectedArticle(related)}
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

  // ===== MAIN LIST VIEW =====
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute h-screen inset-0">
        <Image
          src={ArticleBg}
          alt="Article background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>

      <Navbar />

      {/* Hero */}
      <div className="relative h-screen top-13 lg:top-18 z-30 flex flex-col items-center justify-center text-center px-4">
        <div
          className="inline-flex items-center justify-center 
            w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
            border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
            px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3"
        >
          <p className="whitespace-nowrap font-sans">
            ✨ Ideas That Move Markets
          </p>
        </div>

        <h1 className="text-[36px] md:text-[60px] lg:text-[80px] font-[400] mt-6 max-w-[850px] leading-tight">
          Insight That <span className="text-[#E25B2B] ">Shapes Tomorrow.</span>
        </h1>

        <p className="mt-4 text-[18px] font-sans lg:text-[20px] max-w-[850px] text-white">
          The Business Insight delivers bold perspectives, market intelligence,
          and stories that drive transformation across the world.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchAndFilter
        data={articles}
        onFiltered={setFilteredArticles}
        fields={{
          search: ["name", "description", "sector", "year"],
          filters: { year: "year", country: "country", sector: "sector" },
        }}
      />

      {/* Grid */}
      <div className="relative w-[90%] mx-auto font-sans text-white mt-40 py-10">
        <h1 className="text-[32px] sm:text-[48px] md:text-[60px] font-[500] mb-2">Articles</h1>
        <p className="text-[18px] text-gray-300 mb-10">
          Explore our latest articles and insights for a fresh perspective on
          industry trends and news.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-[42px]">
          {currentArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={article.image_url}
                  alt={article.name}
                  width={633}
                  height={413}
                  className="object-cover rounded-md w-full h-auto"
                />
                <div className="absolute bottom-3 left-3 flex flex-row gap-2">
                  {Array.isArray(article.sector)
                    ? article.sector.map((s, i) => (
                        <div
                          key={i}
                          className="bg-black/30 text-white text-[14] px-3 py-1 rounded-md border border-orange-500"
                        >
                          {s}
                        </div>
                      ))
                    : typeof article.sector === "string"
                    ? article.sector.split(",").map((s, i) => (
                        <div
                          key={i}
                          className="bg-black/30 text-white text-xs px-3 py-1 rounded-md border border-orange-500"
                        >
                          {s.trim()}
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="mt-3 space-y-1 py-2">
                <div className="flex items-center space-x-2">
                  <p className="text-[18px] text-gray-400 items-center">
                    {(Array.isArray(article.country)
                      ? article.country
                      : typeof article.country === "string"
                      ? article.country.split(",")
                      : []
                    ).map((c, i, arr) => (
                      <span key={i}>
                        {c.trim()}
                        {i < arr.length - 1 && (
                          <span className="text-orange-500 items-center rounded-full mx-1">
                            •
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <span className="text-orange-500 items-center rounded-full">
                            •
                          </span>
                  <p className="text-[18px] text-gray-400">{article.year}</p>
                </div>
                <h2 className="text-[28px] font-[500]">{article.name}</h2>
                <span className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[clamp(0.9rem,1.8vw,1.1rem)]">
                  Read more{" "}
                  <Image
                    src={vector2}
                    alt="vector-2"
                    width={17}
                    height={17}
                    className="ml-1"
                  />
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
}
