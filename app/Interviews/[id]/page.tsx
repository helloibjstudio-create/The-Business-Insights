"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

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
  const { id } = useParams();
  const router = useRouter();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [relatedInterviews, setRelatedInterviews] = useState<Interview[]>([]);

  // Fetch current interview
  useEffect(() => {
    if (!id) return;

    const fetchInterview = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews/${id}`
        );
        const data = await res.json();
        setInterview(data);
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };

    fetchInterview();
  }, [id]);

  // Fetch related interviews
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews`
        );
        const data = await res.json();

        // Filter out the current one and take top 2
        const filtered = data.filter((item: Interview) => item.id !== id);
        setRelatedInterviews(filtered.slice(0, 2));
      } catch (err) {
        console.error("Error fetching related interviews:", err);
      }
    };

    fetchRelated();
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
        {/* Back button */}
        <button
          onClick={() => router.push("/Interviews")}
          className="flex items-center text-orange-400 mb-10 hover:text-orange-500 transition"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to interviews
        </button>

        {/* Main Interview Content */}
        <div className="flex flex-col-reverse lg:flex-row bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[20px] font-sans gap-10">
          {/* TEXT SECTION */}
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              {interview.name}
            </h1>

            <div className="space-y-6 text-white font-sans font-normal leading-relaxed">
              <p>{interview.description}</p>

              {interview.write_up ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: interview.write_up,
                  }}
                />
              ) : (
                <>
                  <p>
                    Can you please give us an introduction to{" "}
                    {interview.name} and its role in the{" "}
                    {interview.country} market?
                  </p>
                  <p>
                    What sets apart the {interview.country} industry from the
                    rest of the region?
                  </p>
                  <p>
                    How do you assess the current {interview.country} market?
                  </p>
                  <p>
                    What do you anticipate as the aftermath of recent global
                    events in your sector?
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
            className="relative w-full h-[400px] font-sans rounded-xl overflow-hidden shadow-lg"
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

        {/* RELATED INTERVIEWS */}
        <div className="mt-20 font-sans">
          <h2 className="text-2xl mb-6 font-semibold">
            You may also be interested in...
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedInterviews.map((related) => (
              <div
                key={related.id}
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
                  <Link href={`/exclusive/${related.id}`}><span className="text-orange-400 hover:underline text-sm">
                      Read More →
                    </span></Link>
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
