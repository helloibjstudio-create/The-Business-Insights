"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

interface ExclusiveInterview {
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

export default function ExclusiveInterviewDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [interview, setInterview] = useState<ExclusiveInterview | null>(null);
  const [relatedInterviews, setRelatedInterviews] = useState<ExclusiveInterview[]>([]);

  // Fetch single interview
  useEffect(() => {
    if (!id) return;
    console.log("Fetching interview:", id);

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews/${id}`)
      .then(async (res) => {
        console.log("Response status:", res.status);
        const data = await res.json();
        setInterview(data);
      })
      .catch((err) => console.error("Error fetching interview:", err));
  }, [id]);

  // Fetch all interviews for related section
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
      .then(async (res) => {
        const data = await res.json();
        setRelatedInterviews(data);
      })
      .catch((err) => console.error("Error fetching related interviews:", err));
  }, []);

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
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-orange-400 mb-10 cursor-pointer font-sans hover:text-orange-500 transition"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Exclusive Interviews
        </button>

        {/* Interview content */}
        <div className="flex flex-col-reverse bg-white/3 backdrop-blur-2xl border-[0.5px] border-white/10 p-6 rounded-[20px] lg:flex-row font-sans gap-10">
          {/* Text section */}
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">{interview.name}</h1>

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
                    Can you please give us an introduction to {interview.name} and its
                    role in the {interview.country} market?
                  </p>
                  <p>
                    What sets apart the {interview.country} industry from the rest of the
                    region?
                  </p>
                  <p>
                    How do you assess the current {interview.country} market?
                  </p>
                  <p>
                    What do you anticipate as the aftermath of recent global events in
                    your sector?
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
            className="relative  lg:w-full h-[400px] font-sans rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={interview.image_url}
              alt={interview.name}
              width={100}
              height={100}
              className=" object-contain  object-center w-full h-full"
            />
            <div className="absolute bottom-0 left-0 bg-black/70 p-6 w-full md:w-full text-white rounded-tr-2xl">
              <h3 className="text-xl font-semibold">{interview.name}</h3>
              <p className="text-sm mt-2 opacity-80">{interview.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Related Interviews */}
        <div className="mt-20 font-sans">
          <h2 className="text-2xl mb-6 font-semibold">You may also be interested in...</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedInterviews
              .filter((item) => item.id !== interview.id)
              .slice(0, 2)
              .map((related) => (
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
                    <h4 className="text-lg font-semibold mb-1">{related.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{related.description}</p>
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
