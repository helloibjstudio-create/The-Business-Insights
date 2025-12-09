import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Interview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
  content?: string; // optional for long body
}

// FINAL DESIGN MATCHING THE IMAGE
const MoreInterviews = () => {
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
        null
      );
      const [interviews, setInterviews] = useState<Interview[]>([]);
        useEffect(() => {
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews`)
            .then((res) => res.json())
            .then((data) => setInterviews(data))
            .catch((err) => console.error("Error fetching interviews:", err));
        }, []);
  if (!interviews || interviews.length === 0)
    return <p className="text-center text-gray-400 text-lg">Loading interviews...</p>;

  const featured = interviews[0];
  const list = interviews.slice(1, 5);

  return (
    <section className="w-screen bg-[#0E1116]  text-white py-16 px-6 md:px-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto justify-between lg:items-center mb-10">
        <div>
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold mb-2">More Interviews</h2>
          <p className="text-gray-400 mb-8">Unlock the insights of industry leaders</p>
        </div>
        <Link href="/Interviews" className="bg-[#F57328] w-fit px-5 py-3 rounded-xl font-medium flex items-center gap-2">
          View All Interviews →
        </Link>
      </div>

      <div className="flex flex-col max-w-[1400px] mx-auto lg:flex-row gap-10">
        {/* LEFT — FEATURED INTERVIEW */}
        <div className="flex-1 bg-transparent rounded-3xl p-2 flex flex-col gap-6">
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden">
            <Image src={featured.image_url} alt={featured.name} fill className="object-cover" />
          </div>


          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">{featured.name}</h3>
            <p className="text-gray-200 font-medium">The Miami Association of Realtors highlights Miami-Dade’s unique real estate opportunities, from rising demand in non-FHA condos to strong long-term appreciation driven by relocation trends and low interest rates. Despite market fluctuations and post-COVID shifts, buyer interest remains resilient, creating solid opportunities across residential, warehouse, and multifamily sectors.
</p>
            <p className="text-gray-300 text-sm leading-relaxed">{featured.description}</p>
            <Link href={`/Interviews/${featured.id}`} className="text-[#F57328] font-semibold mt-2 flex items-center gap-2">
              Read Interview →
            </Link>
          </div>
        </div>

        {/* RIGHT — INTERVIEW LIST */}
        <div className="flex-1 flex flex-col  gap-6">
          {list.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-transparent h-fit border-[0.2px] border-white  rounded-xl">
              <div className="relative w-34 h-34 rounded-xl overflow-hidden">
                <Image src={item.image_url} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1 flex flex-col gap-1 p-2">
                <h4 className=" text-[12px] md:text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-400 text-sm">{item.sector}</p>
                <hr className="text-orange-400 mb-4"/>
                <Link href={`/Interviews/${item.id}`} className="text-[#F57328] text-sm font-medium flex items-center gap-1 mt-1">
                  Read Interview →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreInterviews;