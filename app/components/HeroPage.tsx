"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import { BusinessHero } from "@/public";
import { useState } from "react";
import { useRouter } from "next/navigation";


const MOCK_INTERVIEWS = [
  {
    id: "1",
    name: "Jorge Guerra",
    sector: "Real Estate",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764537072/Image_dpmjfe.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2024",
    country: "USA",
    write_up: "<p>Full interview coming soon...</p>",
  },
  {
    id: "2",
    name: "Jorge Guerra",
    sector: "Real Estate",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764537072/Image_dpmjfe.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2024",
    country: "USA",
    write_up: "<p>Full interview coming soon...</p>",
  },
  {
    id: "3",
    name: "Jorge Guerra",
    sector: "Real Estate",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764537072/Image_dpmjfe.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2024",
    country: "USA",
    write_up: "<p>Full interview coming soon...</p>",
  },
];

export default function HeroPage() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen overflow-hidden flex items-start pb-12">
      <Navbar />

      {/* Background layer with tall image */}
      <div className="absolute inset-0 h-[1421px]">
        <Image
          src={BusinessHero}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-0 pt-40 items-center grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-start">
          <h1 className="text-5xl lg:text-7xl font-semibold text-white leading-tight mb-6">
            Business Insight <br /> You Can Trust
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
            We are committed to providing you with extensive market intelligence
            in crucial business sectors across the world.
          </p>

          <button  className="bg-orange-600 w-fit text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 hover:bg-orange-700 transition">
            Explore Interviews
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* RIGHT INTERVIEW CARDS SECTION */}
        <div className="flex flex-col md:items-center lg:items-end space-y-1">
          
          {/* TOP MAIN IMAGE CARD */}
          <div className="relative w-[396px] h-[240px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764537072/Image_dpmjfe.png"
              alt="Main Interview"
              fill
              className="object-cover"
            />

            {/* Orange arrow button */}
            <button  onClick={() => router.push(`/homeInt/${MOCK_INTERVIEWS[0].id}`)} className="absolute right-1 bottom-2 bg-orange-500 hover:bg-orange-600 transition text-white w-12 h-12 rounded-[10px] flex items-center justify-center shadow-lg">
              <ArrowRight />
            </button>
          </div>

          {/* TEXT CARD BELOW MAIN IMAGE */}
          <div className="w-[396px] bg-black/60 backdrop-blur-2xl border border-white/10 p-4 rounded-xl text-white shadow-xl">
            <h2 className="text-xl font-bold">Jorge Guerra</h2>
            <p className="text-orange-400 text-sm font-medium mb-1">
              Chairman of the Miami Association of Realtors
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              In terms of single-family homes, the primary opportunity lies in
              non-FHA 5% financeable condos. We’re actively lobbying for better
              affordability in that market segment to ensure broader accessibility
              for the general public.
            </p>
          </div>

          {/* TWO SMALL CARDS */}
          <div className="flex flex-col space-y-4">
            
            {/* CARD 1 */}
            <div className="relative w-[396px] h-38 rounded-xl overflow-hidden bg-black/30 backdrop-blur-2xl border border-white/10 flex">
              <div className="relative w-[210px] h-full">
                <Image
                  src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764538313/Mask_group_zlx7ex.png"
                  alt="Card 1"
                  fill
                  className="object-cover"
                />
              <button onClick={() => router.push(`/homeInt/${MOCK_INTERVIEWS[1].id}`)} className="absolute right-0 bottom-2 bg-orange-500 hover:bg-orange-600 transition text-white w-12 h-12 rounded-[15px] flex items-center justify-center shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </button>
              </div>

              <div className="flex items-center px-4 text-white text-sm flex-1">
                Chile’s Copper Production and Advancements
              </div>

            </div>

            {/* CARD 2 */}
            <div className="relative w-[396px] h-38 rounded-xl overflow-hidden bg-black/30 backdrop-blur-2xl border border-white/10 flex">
              <div className="relative w-[210px] h-full">
                <Image
                  src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1764538601/Mask_group_1_cfbzff.png"
                  alt="Card 2"
                  fill
                  className="object-cover"
                />
              <button onClick={() => router.push(`/homeInt/${MOCK_INTERVIEWS[2].id}`)} className="absolute right-0 bottom-2 bg-orange-500 hover:bg-orange-600 transition text-white w-12 h-12 rounded-[15px] flex items-center justify-center shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </button>
              </div>

              <div className="flex items-center px-4 text-white text-sm flex-1">
                Singapore’s Aerospace Industry Looks to Automation and
                Disruptive Technologies for Growth
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
