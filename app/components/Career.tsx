"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { BusinessLogo, InterviewBg, scho, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "./Footer";

const Career = () => {
  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}
      <a href="https://www.takatufscholars.om/">
        <Image
          src={scho}
          alt="DHL Banner"
          width={1180}
          height={233}
          className="z-10 relative top-32 md:top-32 lg:top-32 mx-auto  object-contain w-[90%] sm:w-[80%] lg:w-[80%]"
        />
      </a>
      {/* Navbar */}
      <Navbar />

      <section>
        <div className="absolute top-20 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section
          className="relative z-10 w-[300px] md:w-[500px] lg:w-[1000px] top-20 mx-auto mt-24 mb-32 p-6 md:p-9 
        bg-orange-500/3 border border-white/10 backdrop-blur-2xl glow-orange2 rounded-2xl shadow-[0_0_40px_rgba(232,96,46,0.1)] 
        leading-relaxed text-[15px] sm:text-base"
        >
          <h1 className="text-[36px] md:text-[55px] lg:text-[73px] mb-2">
            Career
          </h1>
          <p className="mb-5 font-sans">
            The Business Insight is on a constant lookout for fresh and
            enthusiastic team members, as we broaden our global reach and delve
            deeper into various sectors of international business. Our company
            seeks out individuals with diverse linguistic capabilities, drawing
            from prestigious universities and business schools worldwide.
          </p>
          <p className="mb-5 font-sans">
            Ideal candidates should possess impeccable English skills and
            proficiency in at least one other language. Alongside this, a wealth
            of travel experience, polished presentation abilities, a profound
            comprehension of the business landscape, and a readiness for
            extensive travel are essential traits. Within our communication and
            marketing department, we engage candidates who similarly boast
            educational backgrounds from renowned institutions, multilingual
            aptitude, travel exposure, and exceptional presentation
            proficiencies.
          </p>

          <p className="pb-5 font-sans">
            Every new recruit at The Business Insight undergoes comprehensive
            training. Our remuneration package encompasses an attractive
            tax-free salary complemented by commissions. Additional perks
            encompass accommodation, global health coverage along with a wealth
            of international experience.
          </p>
          <p className="font-sans">
            To initiate the application process, please forward your CV, a
            recent photograph, and a cover letter to{" "}
            <a
              href="mailto:helloibj.studio@gmail.com?subject=Career%20Application&body=Hello%2C%20I%20would%20like%20to%20apply%20for%20a%20position%20at%20The%20Business%20Insight."
              className="text-[#E8602E] underline hover:text-orange-400 transition-colors"
            >
              helloibj.studio@gmail.com
            </a>
          </p>
        </section>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-30 right-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-420 -right-150 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
      </section>
      <Footer />
    </section>
  );
};

export default Career;
