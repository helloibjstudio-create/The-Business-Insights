"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Interview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
}

export default function TrendingArticles() {
  const [articles, setArticles] = useState<Interview[]>([]);

  useEffect(() => {
    fetch("/api/Trendingarticles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const featured = articles[0];
  const others = articles.slice(1, 4);

  return (
    <section className="w-full bg-[#0b0b0d] text-white py-20 px-6 lg:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-tight">
              Trending Articles
            </h2>
            <p className="text-gray-300 text-[clamp(1rem,2vw,1.2rem)] mt-1">
              Explore our latest articles and insights.
            </p>
          </div>

          <Link href="/articles">
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] px-6 py-3 rounded-xl font-medium flex items-center gap-2"
            >
              View All Articles →
            </motion.button>
          </Link>
        </div>

        {featured && (
          <>
            {/* FEATURED FULL-WIDTH MAIN CARD */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-transparent rounded-3xl overflow-hidden shadow-xl mb-10 p-0 flex flex-col lg:flex-row"
            >
              {/* IMAGE SECTION */}
              <div className="relative w-full lg:w-[620px] h-[320px] lg:h-[420px] rounded-3xl overflow-hidden">
                <Image
                  src={featured.image_url}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />

                {/* ARROW BUTTON ON IMAGE */}
                <Link
                  href={`/exclusive/${featured.id}`}
                  className="absolute bottom-6 right-6 bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all"
                >
                  →
                </Link>
              </div>

              {/* TEXT SECTION */}
              <div className="p-8 lg:p-12 flex flex-col justify-center w-full lg:w-[45%]">
                <h3 className="text-[clamp(1.4rem,2.5vw,4rem)] font-semibold leading-tight">
                  {featured.name}
                </h3>

                <p className="text-gray-300 mt-4 text-[1.05rem] leading-relaxed line-clamp-5">
                  {featured.description}
                </p>
              </div>
            </motion.div>

            {/* SMALL ARTICLES UNDER THE FEATURED ONE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-transparent rounded-3xl shadow-lg flex items-center gap-6"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <Link
                      href={`/exclusive/${item.id}`}
                      className="bg-[#E8602E] hover:bg-white absolute right-2 bottom-1 text-white hover:text-[#E8602E] w-[40px] h-[40px] rounded-[12px] p-3 transition-all"
                    >
                      →
                    </Link>
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                  <p className="text-[1rem] font-medium leading-tight line-clamp-4 flex-grow">
                    {item.name}
                  </p>

                  {/* Arrow */}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
