"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

interface Article {
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

  const [interview, setInterview] = useState<Article | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Article[]>([]);

  // Fetch current article
  useEffect(() => {
    if (!id) return;

    const fetchInterview = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/articles/${id}`
        );
        const data = await res.json();
        setInterview(data);
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };

    fetchInterview();
  }, [id]);

  // Fetch all articles for related posts
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/articles`
        );
        const data = await res.json();

        // Filter out current article
        const filtered = data.filter((item: Article) => item.id !== id);
        setRelatedPosts(filtered.slice(0, 2)); // show top 2 related
      } catch (err) {
        console.error("Error fetching related:", err);
      }
    };

    fetchRelated();
  }, [id]);

  if (!interview) {
    return (
      <div className="text-center font-sans text-white py-40">
        Loading article details...
      </div>
    );
  }

  return (
    <section className="bg-black text-white font-sans min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Back button */}
        <button
          onClick={() => router.push("/articles")}
          className="flex items-center text-orange-400 mb-10 cursor-pointer hover:text-orange-500 transition"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to articles
        </button>

        {/* Interview content */}
        <div className="flex flex-col-reverse bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl font-sans gap-10">
          {/* TEXT SECTION */}
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              {interview.name}
            </h1>
            <p className="mb-6 text-gray-300">{interview.description}</p>

            {interview.write_up ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: interview.write_up,
                }}
              />
            ) : (
              <p>Post not yet ready…</p>
            )}
          </div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={interview.image_url}
              alt={interview.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Related Posts */}
        <div className="mt-20 font-sans">
          <h2 className="text-2xl mb-6 font-semibold">
            You may also be interested in…
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
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
                  <Link href={`/articles/${related.id}`}><span className="text-orange-400 hover:underline text-sm">
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
