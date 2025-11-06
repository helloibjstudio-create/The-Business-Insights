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
  write_up?: string;
}

export default function InterviewDetailPage() {
  const { id } = useParams(); // ⬅️ pulls the [id] from the URL
  const [interviews, setInterviews] = useState<Interview | null>(null);

useEffect(() => {
  if (!id) return;
  console.log("Fetching interview:", id);
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews/${id}`)
    .then(async (res) => {
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Data:", data);
      setInterviews(data);
    })
    .catch((err) => console.error("Error fetching interview:", err));
}, [id]);
  if (!interviews) {
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
          {/* Back button */}
          <button
            onClick={() => setInterviews(null)}
            className="flex items-center text-orange-400 mb-10 hover:text-orange-500 transition"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to interviews
          </button>

          {/* Interview content */}
          <div className="flex flex-col-reverse bg-white/3 backdrop-blur-2xl border-[0.5px] border-white/10 p-6 rounded-[20px] lg:flex-row font-sans gap-10">

  {/* TEXT SECTION */}
  <div className="w-full">
    <h1 className="text-3xl md:text-4xl font-semibold mb-6">
      {interviews.name}
    </h1>

    <div className="space-y-6 text-white font-sans font-normal leading-relaxed">
      <p>{interviews.description}</p>

      {interviews.write_up ? (
        <div
          dangerouslySetInnerHTML={{
            __html: interviews.write_up,
          }}
        />
      ) : (
        <>
          <p>
            Can you please give us an introduction to{" "}
            {interviews.name} and its role in the{" "}
            {interviews.country} market?
          </p>
          <p>
            What sets apart the {interviews.country} industry
            from the rest of the region?
          </p>
          <p>
            How do you assess the current {interviews.country} market?
          </p>
          <p>
            What do you anticipate as the aftermath of recent global events
            in your sector?
          </p>
        </>
      )}
    </div>
  </div>


            {/* Image + name card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] font-sans rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={interviews.image_url}
                alt={interviews.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-orange-500 p-6 w-full md:w-[85%] text-white rounded-tr-2xl">
                <p className="text-sm opacity-80 uppercase mb-1">
                  {interviews.sector}
                </p>
                <h3 className="text-xl font-semibold">
                  {interviews.name}
                </h3>
                <p className="text-sm mt-2 opacity-80">
                  {interviews.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          <div className="mt-20 font-sans">
            <h2 className="text-2xl mb-6 font-semibold">
              You may also be interested in...
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
  {Array.isArray(interviews) &&
    interviews
      .filter((item) => item.id !== interviews?.id)
      .slice(0, 2)
      .map((related) => (
        <div
          key={related.id}
          onClick={() => setInterviews(related)}
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
            <h4 className="text-lg font-semibold mb-1">{related.name}</h4>
            <p className="text-sm text-gray-400 mb-3">{related.sector}</p>
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
