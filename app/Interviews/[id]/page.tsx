"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface Interview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  content?: string;
}

export default function InterviewDetailPage() {
  const { id } = useParams(); // ⬅️ pulls the [id] from the URL
  const [interview, setInterview] = useState<Interview | null>(null);

useEffect(() => {
  if (!id) return;
  console.log("Fetching interview:", id);
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews/${id}`)
    .then(async (res) => {
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Data:", data);
      setInterview(data);
    })
    .catch((err) => console.error("Error fetching interview:", err));
}, [id]);
  if (!interview) {
    return (
      <div className="text-center text-white py-40">
        Loading interview details...
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* 🔙 Back button */}
        <a
          href="/"
          className="flex items-center text-orange-400 mb-10 hover:text-orange-500 transition"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to interviews
        </a>

        <div className="grid md:grid-cols-2 gap-10">
          {/* TEXT SECTION */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              {interview.name}
            </h1>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>{interview.description}</p>
              {interview.content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: interview.content }}
                />
              ) : (
                <>
                  <p>
                    Can you please give us an introduction to{" "}
                    {interview.name} and its role in the{" "}
                    {interview.country} market?
                  </p>
                  <p>
                    What sets apart the {interview.country} industry
                    from the rest of the region?
                  </p>
                </>
              )}
            </div>
          </div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={interview.image_url}
              alt={interview.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-orange-500 p-6 w-full md:w-[85%] text-white rounded-tr-2xl">
              <p className="text-sm opacity-80 uppercase mb-1">
                {interview.sector}
              </p>
              <h3 className="text-xl font-semibold">{interview.name}</h3>
              <p className="text-sm mt-2 opacity-80">
                {interview.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
