"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { vector2 } from "@/public";

interface ExclusiveInterview {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  write_up: string;
}

export default function ExclusiveInterviewsSlider() {
  const [exclusiveInterviews, setExclusiveInterviews] = useState<ExclusiveInterview[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched interviews:", data);

        // Always ensure it's an array
        if (Array.isArray(data)) {
          setExclusiveInterviews(data);
        } else if (Array.isArray(data?.data)) {
          setExclusiveInterviews(data.data);
        } else {
          setExclusiveInterviews([]);
        }
      })
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  return (
    <motion.div className="relative w-full mt-10 text-white overflow-y-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6 px-4">
        <div>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold">
            Exclusive Interviews
          </h2>
          <p className="text-gray-300 text-[clamp(1rem,2vw,1.25rem)] mt-2">
            Unlock the insights of industry leaders
          </p>
        </div>

        <Link href="/Interviews">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] px-6 py-3 rounded-xl"
          >
            View All Interviews
          </motion.button>
        </Link>
      </div>

      {/* SLIDER */}
      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
          bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20
          w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="text-white" />
        </button>

        {/* SLIDER CONTENT */}
        <div className="flex overflow-x-auto gap-6 px-2 scrollbar-hide snap-x snap-mandatory">
          {exclusiveInterviews?.map((person) => (
            <motion.div
              key={person.id}
              className="min-w-[280px] sm:min-w-[330px] lg:min-w-[360px]
               backdrop-blur-xl border border-white/10 rounded-2xl 
              overflow-hidden shadow-lg snap-center flex-shrink-0 h-[420px]"
              whileHover={{ scale: 1.03 }}
              transition={{ ease: "easeOut" }}
            >
              {/* IMAGE */}
              <div className="absolute w-full h-[220px] lg:h-[420px]">
                <Image
                  src={person.image_url}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* TEXT CONTENT */}
              <div className="p-5 font-sans w-[98%] backdrop-blur-2xl rounded-2xl m-auto mb-1 right-0 left-0 bottom-0 absolute bg-black/60">
                <h3 className="font-semibold text-xl">{person.name}</h3>
                <p className="text-grey-900 text-sm mt-1 mb-2">{person.description}</p>
                <hr className="text-[#E8602E]"/>
                <Link
                  href={`/exclusive/${person.id}`}
                  className="inline-flex items-center mt-3 text-[#E8602E] hover:underline text-sm"
                >
                  Read Interview
                  <Image
                    src={vector2}
                    alt="arrow"
                    width={10}
                    height={10}
                    className="ml-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
          bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20
          w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ArrowRight className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
