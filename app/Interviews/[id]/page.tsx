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
      <div className="text-center font-sans text-white py-40">
        Loading interview details...
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <button
            onClick={ () => router.push("/Interviews")}
            className="flex items-center text-orange-400 font-sans cursor-pointer mb-10 hover:text-orange-500 transition"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to interviews
          </button>

          <div className="flex flex-col-reverse bg-white/3 min-h-screen backdrop-blur-2xl border-[0.5px] border-white/10 p-6 rounded-[20px] lg:flex-row font-sans gap-10">
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
                      post coming up....
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className=" w-full lg:w-[472.2px] lg:h-[400px]">
              <div className="p-6 w-full justify-self-end text-end text-white rounded-tr-2xl">
                <p className="text-[18px] opacity-80 uppercase mb-1">
                  {interview.year}
                </p>
                <p className="text-[18px] opacity-80 uppercase mb-1">
                  {interview.sector}
                </p>
                <h3 className="text-xl font-semibold">
                  {interview.name}
                </h3>
                <p className="text-[18px] mt-2 opacity-80">
                  {interview.description}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative lg:w-[372.2px] h-[400px] font-sans rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={interview.image_url}
                  alt={interview.name}
                  width={472.2}
                  height={400}
                  className="object-cover w-full h-full rounded-xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Related section */}
          <div className="mt-20 font-sans">
            <h2 className="text-2xl mb-6 font-semibold">
              You may also be interested in...
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedInterviews
                .filter((item) => item.id !== interview.id)
                .slice(0, 2)
                .map((related) => (
                  <div
                    key={related.id}
                    onClick={() => setInterview(related)}
                    className="cursor-pointer bg-[#111]/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
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
