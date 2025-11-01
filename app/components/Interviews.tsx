"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { InterviewBg } from "@/public";
import { useEffect, useState } from "react";

interface Interview {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/interviews")
      .then((res) => res.json())
      .then((data) => setInterviews(data))
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
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
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-40 space-y-6">
        {/* Tagline */}
        <div
          className="inline-flex items-center justify-center 
                        w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:w-[582px] 
                        border border-[#E8602E] text-white text-sm sm:text-base md:text-[20px] 
                        px-4 sm:px-6 py-2 rounded-full font-medium tracking-wide backdrop-blur-md glow-orange3"
        >
          <p className="whitespace-nowrap">✨ Voices Behind Change</p>
        </div>

        {/* Heading */}
        <h1
          className="font-[400] leading-tight 
                       text-3xl sm:text-4xl md:text-5xl lg:text-[80px] 
                       max-w-[90%] sm:max-w-[650px] md:max-w-[800px] lg:w-[975px]"
        >
          Exclusive Interviews <br className="hidden sm:block" />
          with <span className="text-[#E25B2B]">Leaders & Innovators</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg 
                      max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl 
                      leading-relaxed"
        >
          Dive into conversations that shape industries, nations, and futures.
          From business visionaries to policy makers, our interviews bring you
          first-hand perspectives on what’s next.
        </p>
      </div>
      <section className="min-h-screen bg-black text-white px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Latest Interviews
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl p-6 shadow-md border border-zinc-800 hover:scale-[1.02] transition-transform"
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-400">{item.sector}</p>
              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Interviews;
