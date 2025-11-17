"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import {
  AboutHero,
  AboutSecond,
  BusinessLogo,
  InterviewBg,
  Oman,
  thirdOrange,
} from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Hedvig_Letters_Serif } from "next/font/google";
import Footer from "./Footer";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute h-screen inset-0">
        <Image
          src={AboutHero}
          alt="About background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        <Image
          src={Oman}
          alt="DHL Banner"
          width={1180}
          height={233}
          className="z-10 absolute top-1/4 md:top-1/3 lg:top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain w-[90%] sm:w-[80%] lg:w-[80%]"
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative h-screen top-30 md:top-50 lg:top-90 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-20 pt-28 sm:pt-32 md:pt-25 space-y-6">
        {/* Tagline */}
        <div>
          <h1 className="text-[50px] lg:text-[99px] relative">About Us</h1>
        </div>

        {/* Heading */}
        <h1
          className="font-[400] leading-tight 
                       text-3xl sm:text-4xl md:text-5xl lg:text-[48px] max-w-[775px]
                       tracking-[-1.92px] font-sans font-[400] leading-[48px] text-"
        >
          Enjoy firsthand{" "}
          <span className={`text-[#E8602E] ${hedvig.className}`}>insights</span>{" "}
          to{" "}
          <span className={`text-[#E8602E] ${hedvig.className}`}>
            investors, enterprises and governments
          </span>{" "}
          about the most dynamic markets.
        </h1>

        {/* Subtext */}
        <p
          className="text-white text-[18px] sm:text-[19px] md:text-[20px] lg:text-[20px] 
                      max-w-[90%] font-sans sm:max-w-[600px] md:max-w-[700px] lg:max-w-3xl 
                      leading-relaxed"
        >
          The Business Insight organizes frequent round table discussions and
          events, gathering key stakeholders to tackle pressing matters. We not
          only attend but also collaborate with chosen organizers of industry
          conferences to present you with premier networking and
          knowledge-sharing opportunities.
        </p>
      </div>

      <section className="relative h-full mb-20 top-50 lg:mb-90 lg:top-100">
        <div className="absolute  w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>
        <section className="relative bg-transparent  text-white py-16 px-6 md:px-20 lg:px-32 overflow-hidden">
          <div className="max-w-9xl mx-auto flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* LEFT TEXT CONTENT */}
            <div className="space-y-0">
              {/* Core Values */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[80px] font-[400] mb-4">
                  Core Values
                </h2>
                <p className="text-white font-sans font-[500] mb-[40px] text-[20px] leading-relaxed">
                  Our goal is to spotlight global investment prospects with
                  in-depth and timely market reports. We aim to create
                  authoritative, unbiased, and valuable reports for business
                  leaders. We strive to unite industry leaders and foster
                  focused networking.
                </p>
              </div>

              {/* Our Content */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[80px] font-[400] mb-4">
                  Our Content
                </h2>
                <p className="text-white font-sans font-[500] mb-[20px] text-[20px] leading-relaxed">
                  Our content exclusively comprises original material, rooted in
                  exclusive interviews with corporate executives, governmental
                  figures, and industry authorities. Collaborating with esteemed
                  media platforms across the world, our expertise lies in
                  assessing cutting-edge insights that mold the future of
                  business.
                </p>
                <p className="text-white font-sans font-[500] mb-[80px] text-[20px] leading-relaxed">
                  In a time marked by flourishing internationalization,
                  expanding choices, and an influx of data and knowledge,
                  possessing accurate information at the right moment serves as
                  a pivotal foundation for the next strategic business move. The
                  Business Insight is dedicated to delivering precisely that,
                  serving as your trusted source of guidance and insight.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={AboutSecond}
                  alt="Business Insight Office"
                  width={638}
                  height={920}
                  className="object-cover w-[550vh] lg:h-[130vh]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Optional soft background gradient */}
        </section>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[900px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
      </section>

      <Footer />
    </section>
  );
};

export default About;
