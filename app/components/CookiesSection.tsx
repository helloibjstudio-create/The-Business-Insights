"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Anni, BusinessLogo, InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "./Footer";

const CookiesSection = () => {
  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}
      <a href="https://www.takatufscholars.om/">
        <Image
          src={Anni}
          alt="DHL Banner"
          width={1180}
          height={233}
          className="z-10 relative top-32 md:top-32 lg:top-32 mx-auto  object-contain w-[90%] sm:w-[80%] lg:w-[80%]"
        />
      </a>
      {/* Navbar */}
      <Navbar />

      <section>
        <div className="absolute -top-20 w-full h-full">
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
          <h1 className="text-[36px] md:text-[55px] lg:text-[73px]">
            Cookies Policy
          </h1>
          <p className="mb-5 font-sans">
            Information last updated: 16th August 2018
          </p>
          <p className="mb-5 font-sans">
            The Business Insight (“we,” “us,” or “our”) employs cookies on the
            thebusinessinsight.com website (referred to as the “Service”). Your
            use of the Service implies your agreement to the utilization of
            cookies.{" "}
          </p>
          <p className="mb-12 font-sans">
            Our Cookies Policy delineates the nature of cookies, their
            application, the possible involvement of third-party partners in
            their use on the Service, your choices concerning cookies, and
            additional insights into their operation.
          </p>
          <div className="font-sans">
            <h1 className="font-bold">Definition of cookies:</h1>
            <p className="pb-5">
              Cookies are minuscule segments of text transmitted by a website
              you visit, which your web browser then stores. This storage of a
              cookie file in your web browser facilitates recognition by the
              Service or a third party, enhancing the convenience of your
              subsequent visits and augmenting the Service’s utility to you.
              Cookies can be categorized as either “persistent” or “session”
              cookies.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">
              How The Business Insight employs cookies:
            </h1>
            <p className="pb-2">
              During your interaction with the Service, we may implant several
              cookie files within your web browser.
            </p>
            <p className="pb-2">
              Our utilization of cookies serves the following objectives:
              enabling specific functionalities of the Service, conducting
              analytics, retaining your preferences, facilitating the delivery
              of advertisements, which may encompass behavioral advertising.{" "}
            </p>
            <p className="pb-2">
              The Service utilizes both session and persistent cookies,
              encompassing diverse types to ensure its proper operation:
            </p>
            <li className="pb-5">
              Essential cookies: These may be employed to authenticate users and
              thwart fraudulent usage of user accounts.
            </li>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">
              Third-party cookies and third-party advertising:
            </h1>
            <p className="pb-5">
              Apart from our proprietary cookies, we might employ cookies from
              various third-party sources to track Service usage statistics,
              dispense advertisements on the Service, and more. Each advertiser
              assumes sole responsibility for the content of their advertising
              material. The Business Insight bears no accountability for the
              content of advertising material.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Your options regarding cookies:</h1>
            <p className="pb-2">
              Should you wish to eliminate cookies or guide your web browser to
              discard or reject cookies, guidance can be found on your web
              browser’s help pages.
            </p>

            <p className="pb-5">
              It’s important to note, however, that deleting or rejecting
              cookies might curtail your ability to access all the features we
              provide. You might encounter difficulties storing your
              preferences, and certain pages may not exhibit correct displays.
            </p>
          </div>
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

export default CookiesSection;
