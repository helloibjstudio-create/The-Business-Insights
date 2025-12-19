"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
        <div className="flex flex-col-reverse min-h-[1800px] bg-white/3 items-baseline backdrop-blur-2xl border-[0.5px] border-white/10 p-6 rounded-[20px] lg:flex-row font-sans gap-10">
                    <div className="w-full relative top-0">
                     
        
                      <div className="space-y-6 text-white font-sans font-normal leading-relaxed">
                        
                        {interview.write_up ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: interview.write_up,
                            }}
                          />
                        ) : (
                          <>
                            <p>post coming up...</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className=" w-full lg:w-[472.2px] lg:h-[400px]">
                      <div className="p-6 w-full justify-self-end text-end text-white rounded-tr-2xl">
                        <p className="text-[18px] opacity-80 uppercase mb-1">
                          {interview.year}
                        </p>
                        <h3 className="text-xl font-semibold">
                          {interview.name}
                        </h3>
                        <p className="text-[18px] mt-2 opacity-80">
                          {interview.description}
                        </p>
                      </div>
                      <div className="w-full lg:w-[432px] flex flex-col gap-4">
          {/* First image */}
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
              className="object-cover rounded-xl"
            />
          </motion.div>
        
          {/* Second image fills remaining width below */}
          <div className="relative w-full hidden lg:flex lg:h-[1000px] rounded-xl overflow-hidden shadow-lg">
              <Image
              src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1765550926/IMG_1779_cm9qwe.jpg"
              alt="banner"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        
                    </div>
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
                  className="cursor-pointer relative rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
                >
                  <div className="relative inset-0 w-full h-[340px]">
                    <Image
                      src={related.image_url}
                      alt={related.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-5 absolute bottom-2 w-[96%] bg-black/50 backdrop-blur-xl rounded-xl mx-auto left-0 right-0">
                    <h4 className="text-lg font-semibold mb-1">{related.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{related.description}</p>
                    <Link href={`/exclusive/${related.id}`}><span className="text-orange-400 hover:underline text-sm items-center inline-flex">
                      Read More <ArrowRight className="w-4 inline-block" />
                    </span></Link>
                  </div>
                  
                </div>
              ))}
          </div>
        </div>
      </div>
<div className="w-[46%]  md:w-[40%] mx-auto lg:hidden flex relative h-[400px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
      <Image
      src="https://res.cloudinary.com/dnzntr9lt/image/upload/v1765550926/IMG_1779_cm9qwe.jpg"
      alt="banner"
      fill
      className="object-fill mb-12 w-100"
      priority
    />
  </div>
      <Footer />
    </section>
  );
}
