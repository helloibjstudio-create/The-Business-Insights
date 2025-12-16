"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ExclusiveInterview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string | null;
  link: string | null;
  country: string;
  write_up: string | null;
}

export default function ExclusiveInterviewsSlider() {
  const [exclusiveInterviews, setExclusiveInterviews] = useState<ExclusiveInterview[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Fetch interviews
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setExclusiveInterviews(data);
        else if (Array.isArray(data?.data)) setExclusiveInterviews(data.data);
        else setExclusiveInterviews([]);
      })
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-[#0E1116] text-white overflow-hidden">
      {/* HEADER */}
      <div className="flex pt-12 max-w-[1400px] mx-auto flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6 px-4">
        <div>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold">
            Exclusive Interviews
          </h2>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.25rem)] mt-2">
            Unlock the insights of industry leaders
          </p>
        </div>

        <Link href="/Interviews">
          <button className="bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] px-6 py-3 rounded-xl transition">
            View All Interviews
          </button>
        </Link>
      </div>

      {/* SLIDER */}
      <div className="max-w-[1400px] mx-auto relative px-4">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="text-white" />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {exclusiveInterviews.map((person) => (
            <div
              key={person.id}
              className="
                flex-shrink-0
                w-[260px]
                md:w-[260px]
                lg:w-[270px]
                xl:w-[280px]
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                overflow-hidden
                shadow-lg
                min-h-[420px]
                relative
              "
            >
              <div className="absolute inset-0">
                <Image
                  src={person.image_url}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 w-[96%] backdrop-blur-2xl rounded-2xl mx-auto mb-2 left-0 right-0 bottom-0 absolute bg-black/60">
                <h3 className="font-semibold text-lg">{person.name}</h3>
                <p className="text-gray-300 text-sm mt-1 mb-2">
                  {person.description}
                </p>
                <hr className="border-[#E8602E] mb-2" />
                <Link
                  href={`/exclusive/${person.id}`}
                  className="inline-flex items-center text-[#E8602E] hover:underline text-sm"
                >
                  Read Interview
                  <ArrowRight className="w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
}
