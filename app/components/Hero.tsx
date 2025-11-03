"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  articles,
  BusinessHero,
  BusinessLogo,
  dhl,
  interviews,
  mailbox,
  moreInterviews,
  reports,
  subtract,
  thirdOrange,
  vector,
  vector2,
} from "../../public/index.js";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Hedvig_Letters_Serif } from "next/font/google";
import Navbar from "./Navbar.js";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: ["400"],
});
const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [reversing, setReversing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // === SCROLL + SECTION ANIMATION CONTROL ===
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isAutoScrolling = false;

    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const width = window.innerWidth;

      // dynamic trigger based on device
      let exclusiveTrigger;
      if (width < 640) exclusiveTrigger = vh * 1; // mobile
      else if (width < 1024) exclusiveTrigger = vh * 1; // tablet
      else exclusiveTrigger = vh * 1.3; // desktop

      if (isAutoScrolling) return; // 🔒 block during smooth scroll

      // === Smooth scroll trigger ===
      if (!scrolled && y > vh * 0.1) {
        setScrolled(true);
        isAutoScrolling = true;

        window.scrollTo({
          top: exclusiveTrigger - vh * 0.1,
          behavior: "smooth",
        });

        setTimeout(() => {
          isAutoScrolling = false;
        }, 1000); // unlock after animation
      }

      // === Reverse scroll ===
      if (scrolled && y < vh * 0.2 && !isAutoScrolling) {
        setScrolled(false);
      }

      // === Show Articles ===
      const articleTrigger = exclusiveTrigger + vh * 0.000000000000000000000005;
      if (y > articleTrigger && !showArticles) {
        setShowArticles(true);
      } else if (y < articleTrigger * 0.7 && showArticles) {
        setShowArticles(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, showArticles]);

  // === REVERSE TO HERO ===
  const handleReverse = () => {
    setReversing(true);
    setShowArticles(false);
    setScrolled(false);

    // Force scroll to top (bypasses partial scroll issues)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50); // small delay ensures DOM is ready

    setTimeout(() => setReversing(false), 1200);
  };

  return (
    <main className="relative flex justify-center w-full overflow-hidden text-white select-none">
      <div className="relative w-full min-h-[1300vh] md:min-h-[1270vh] lg:min-h-[1100vh] xl:min-h-[1000vh] overflow-hidden">
        {/* === BACKGROUND IMAGE === */}
        <motion.div
          className="absolute w-full h-[2200px] bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.4)_100%),url('https://res.cloudinary.com/dnzntr9lt/image/upload/v1761663613/businessHero_qvuqwl.png')] bg-cover bg-center bg-no-repeat inset-0"
          animate={{
            scale: scrolled ? 1.3 : loaded ? 1.1 : 1,
            y: scrolled ? -1100 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={BusinessHero}
            alt="Business Insight Background"
            fill
            priority
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 pointer-events-none" />
        </motion.div>

        {/* === CONTENT WRAPPER === */}
        <div className="relative z-10 w-full max-h-screen pointer-events-none">
          <AnimatePresence mode="wait">
            {/* === HERO SECTION === */}
            {!scrolled && !reversing && (
              <motion.section
                id="hero"
                key="hero"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -150 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative top-[80px] sm:top-[110px] md:top-[140px] lg:top-[160px] flex flex-col justify-center items-start px-4 sm:px-8 md:px-12 lg:px-20 h-[90vh] sm:h-screen pointer-events-auto"
              >
                <div className="max-w-[95%] sm:max-w-2xl md:max-w-3xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[36px] sm:text-[50px] md:text-[70px] lg:text-[90px] font-[400px] leading-tight"
                  >
                    Business Insight You Can Trust
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-base sm:text-lg md:text-[20px] font-sans max-w-[95%] sm:max-w-[700px] md:max-w-[801px] py-5 text-gray-200"
                  >
                    We are committed to providing you with extensive market
                    intelligence in crucial business sectors across the world.
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-500 hover:bg-white font-sans text-white hover:text-orange-500 cursor-pointer font-semibold px-6 sm:px-8 py-3 rounded-md transition-all pointer-events-auto text-sm sm:text-base"
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.section>
            )}

            {/* === EXCLUSIVE SECTION === */}
            {scrolled && (
              <motion.section
                key="exclusive"
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="relative top-[120px] sm:top-[150px] md:top-[180px] lg:top-[200px] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen bg-transparent pointer-events-auto"
              >
                <div className="mx-auto flex flex-col h-full justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6"
                  >
                    <div>
                      <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-[500px] font-sans">
                        Exclusive Interviews
                      </h2>
                      <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] font-sans mt-2">
                        Unlock the insights of industry leaders
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-[500px] font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
                    >
                      View All Interviews
                    </motion.button>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {interviews.map((person, i) => (
                      <motion.div
                        key={person.name}
                        
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                      >
                        <div className="h-[300px] sm:h-[400px] relative">
                          <Image
                            src={person.img}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-6 sm:pt-8 px-4">
                          <h3 className="font-[600px] text-[22px] sm:text-[26px] md:text-[30px] font-sans">
                            {person.name}
                          </h3>
                          <p className="text-[16px] sm:text-[18px] py-2.5 text-white font-sans mb-3">
                            {person.title}
                          </p>
                          <a
                            href={person.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[16px] sm:text-[18px] font-sans"
                          >
                            Read More{" "}
                            <Image
                              src={vector2}
                              alt="vector-2"
                              width={17}
                              height={17}
                              className="ml-1"
                            />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* === ARTICLES SECTION === */}
            
              <motion.section
                key="articles"
                initial={{ opacity: 0, y: 250 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -150 }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 1.2, ease: "easeInOut" },
                }}
                className="relative top-[100px] sm:top-[240px] md:top-[260px] lg:top-[140px] py-16 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen pointer-events-auto"
              >
                <div className="max-w-7xl mx-auto pb-24">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
                    <div>
                      <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-[500px] font-sans">
                        Articles
                      </h2>
                      <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] font-sans mt-2">
                        Explore our latest articles and insights for a fresh
                        perspective on industry trends and news.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-[500px] font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
                    >
                      View All Articles
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.map((article, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform bg-black/20"
                      >
                        <div className="h-[250px] sm:h-[350px] md:h-[416px] relative">
                          <Image
                            src={article.img}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-6 sm:pt-8 px-4 pb-8">
                          <h3 className="font-[600px] text-[20px] sm:text-[22px] md:text-[26px] font-sans">
                            {article.title}
                          </h3>
                          <p className="text-[16px] sm:text-[18px] py-2.5 text-gray-300 font-sans mb-3">
                            {article.description}
                          </p>
                          <a
                            href={article.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-500 underline text-[16px] sm:text-[18px] font-sans"
                          >
                            Read More{" "}
                            <ArrowUpRight size={18} className="ml-1" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            {/* Third section */}
            <motion.section
              key="third"
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{
                once: true,
                amount: 0.5,
                margin: "-60px 0px -60px 0px",
              }}
              className="relative w-full h-[300px] sm:h-[650px] md:h-[750px] lg:h-[900px] flex justify-center items-center overflow-hidden bg-black"
            >
              <div className="relative w-full h-full">
                {/* Background Image */}
                <Image
                  src={thirdOrange}
                  alt="Third section banner"
                  fill
                  className="object-cover h-[50%] lg:h-full"
                  priority
                />

                {/* Centered DHL Image */}
                <Image
                  src={dhl}
                  alt="dhl"
                  width={1278.72}
                  height={333}
                  priority
                  className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      lg:object-contain object-cover w-full max-w-[1278px]"
                />
              </div>
            </motion.section>

            <motion.section
              key="more-interviews"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }} // 👈 triggers earlier (5% visible)
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative w-[90%] justify-center m-auto text-white py-15 px-4 sm:px-6 md:px-12 lg:px-20 
  bg-white/3 backdrop-blur-2xl border-[1px] rounded-[20px] -top-10 lg:-top-20 border-white/10"
            >
              <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-[32px] sm:text-[48px] md:text-[60px] font-sans font-[500px] mb-8 md:mb-12 text-center md:text-left">
                  More Interviews
                </h2>

                {/* Featured Interview */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-12 md:mb-16 items-center">
                  <div className="relative h-[280px] sm:h-[350px] md:h-[420px] rounded-xl overflow-hidden">
                    <Image
                      src={moreInterviews[0].img}
                      alt={moreInterviews[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center text-center md:text-left px-2 sm:px-4">
                    <h3 className="text-[26px] sm:text-[32px] md:text-[40px] w-full md:w-[445px] font-[400px] mx-auto md:mx-0">
                      {moreInterviews[0].name}
                    </h3>
                    <p className="text-[18px] sm:text-[20px] md:text-[24px] font-sans italic text-white mb-3 sm:mb-4">
                      {moreInterviews[0].title}
                    </p>
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-white italic font-sans font-[500px] tracking-[-1px] mb-6">
                      {moreInterviews[0].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-500 hover:bg-white w-fit z-30 text-white hover:text-orange-500 cursor-pointer px-6 sm:px-8 py-3 rounded-[10px] font-[500px] font-sans text-[16px] sm:text-[18px] md:text-[20px] transition"
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>

                {/* Grid of smaller interviews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {moreInterviews.slice(1).map((interview, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }} // 👈 triggers earlier for each card
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="rounded-xl overflow-hidden bg-transparent hover:bg-[#1b1b1b] transition-all"
                    >
                      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[416px]">
                        <Image
                          src={interview.img}
                          alt={interview.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 text-center md:text-left">
                        <p className="text-orange-400 text-[14px] sm:text-[16px] mb-1">
                          {interview.title}
                        </p>
                        <h4 className="font-semibold text-[18px] sm:text-[20px] leading-snug mb-3">
                          {interview.name}
                        </h4>
                        <a
                          href={interview.link}
                          className="inline-flex items-center text-orange-400 hover:text-orange-500 text-[14px] sm:text-[16px] font-medium"
                        >
                          Read More <ArrowUpRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* More Interviews Button */}
                <div className="flex justify-center mt-10">
                  <button className="inline-flex items-center justify-center px-[30px] py-[12px] sm:px-[37px] sm:py-[13px] w-[190px] sm:w-[223px] rounded-[10px] bg-orange-500 hover:bg-red-400 cursor-pointer font-[500px] font-sans hover:text-orange-400 text-[16px] sm:text-[20px]">
                    More Interviews
                  </button>
                </div>
              </div>
            </motion.section>

            <section
              key="reports"
              className="relative bg-transparent px-4 sm:px-6 md:px-12 lg:px-20"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl md:text-[80px] font-normal text-white leading-tight">
                  Discover Our <span className="text-orange-400">Reports</span>
                </h2>

                <p className="text-white mt-3 text-sm sm:text-base md:text-[20px] font-sans mb-6 w-full max-w-[768px] mx-auto leading-relaxed">
                  Browse our latest publications and gain a deeper understanding
                  of emerging trends and critical topics through our in-depth
                  analysis, interviews with local business and political
                  leaders, and comprehensive data and statistics.
                </p>

                <button
                  onClick={() => window.open(moreInterviews[0].link, "_blank")}
                  className="inline-flex items-center justify-center px-6 sm:px-[37px] py-3 sm:py-[13px] mt-4 font-sans rounded-[10px] bg-orange-500 hover:bg-white cursor-pointer font-medium hover:text-orange-400 text-base sm:text-[20px] w-[160px] sm:w-[202px] transition-all duration-300"
                >
                  More Reports
                </button>
              </div>

              {/* Report Cards Grid */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-[32px]">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white 
        w-full xs:max-w-[320px] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-21px)] max-w-[360px]"
                  >
                    <div className="relative w-full h-[320px] sm:h-[420px] md:h-[564px]">
                      <Image
                        src={report.img}
                        alt={report.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              key="events"
              className="relative w-full flex flex-col justify-around items-center overflow-visible bg-black py-20 md:py-32"
            >
              {/* Section Title */}
              <h3 className="text-center text-3xl sm:text-4xl md:text-[60px] font-medium font-sans text-white mt-10 md:mt-0">
                Events
              </h3>

              <div className="relative w-full h-auto overflow-visible px-4 sm:px-6 md:px-0 mt-6 md:mt-0">
                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl md:text-[48px] w-full max-w-[803px] my-4 text-center mx-auto tracking-tight md:tracking-[-1.92px] leading-snug md:leading-[48px] font-sans font-medium text-white z-20 relative">
                  Enjoy the best{" "}
                  <span className={`text-[#E8602E] ${hedvig.className}`}>
                    Events and Exhibitions
                  </span>{" "}
                  where real connections start
                </h3>

                {/* Paragraph */}
                <p className="w-full max-w-[1103px] text-center mx-auto text-base sm:text-lg md:text-[21px] font-sans font-normal md:font-medium leading-relaxed text-white z-20 relative">
                  Engage with us at the forefront of your business. We not only
                  participate in but also organize impactful business
                  conferences and exhibitions, fostering connections and
                  propelling industries forward. Join us in shaping the future
                  of your industry!
                </p>

                {/* Button */}
                <button
                  onClick={() => window.open(moreInterviews[0].link, "_blank")}
                  className="flex items-center px-6 sm:px-8 md:px-[37px] py-3 sm:py-3.5 md:py-[13px] mt-6 md:mt-5 font-sans rounded-[10px] bg-[#E8602E] hover:bg-white cursor-pointer m-auto font-medium hover:text-[#E8602E] text-base sm:text-lg md:text-[20px] z-20 relative transition-all duration-300"
                >
                  Learn More
                </button>

                {/* Overlay/Subtract Image */}
                <div className="absolute top-[40px] md:top-[230px] left-0 w-full h-[750px] sm:h-[900px] md:h-[950px] z-10 overflow-visible pointer-events-none">
                  <Image
                    src={subtract}
                    alt="Subtract overlay"
                    fill
                    className="object-contain md:object-cover glow-orange"
                    priority
                  />
                </div>
              </div>
            </section>
            <section key="Newsletter" className="relative top-50 md:top-120 lg:top-170 bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[1000px] mx-auto mt-40 md:mt-48 lg:mt-56 overflow-visible px-6 md:px-10 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between">
              {/* Mailbox Image */}
              <div className="absolute -top-16 sm:-top-20 md:-top-24 lg:-top-28 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 flex justify-center md:justify-start w-full md:w-auto z-0">
                <Image
                  src={mailbox}
                  alt="Mailbox illustration"
                  width={420}
                  height={420}
                  className="w-[200px] sm:w-[250px] md:w-[320px] z-0 lg:w-[400px] h-auto object-contain"
                  priority
                />
              </div>

              {/* Text & Form Wrapper */}
              <div className="mt-32 sm:mt-36 md:mt-0 md:ml-[340px] lg:ml-[380px] flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 font-sans w-full px-4 md:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-[30px] font-bold leading-snug max-w-[520px]">
                  Join us! Subscribe to our weekly newsletter
                </h2>

                <form className="flex items-center bg-[#2D0C00] rounded-full px-3 py-2 gap-2 w-full max-w-[380px] justify-between">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 6C8.189 6 5.5 8.689 5.5 12C5.5 15.311 8.189 18 11.5 18C14.811 18 17.5 15.311 17.5 12C17.5 8.689 14.811 6 11.5 6ZM11.5 8C13.708 8 15.5 9.792 15.5 12C15.5 14.208 13.708 16 11.5 16C9.292 16 7.5 14.208 7.5 12C7.5 9.792 9.292 8 11.5 8Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.25 17L19.343 16.999C20.304 16.975 21.22 16.583 21.902 15.902C22.605 15.198 23 14.245 23 13.25V11C23 5.52 18.592 1.07 13.129 1.001L13 1H12C5.929 1 1 5.929 1 12C1 18.071 5.929 23 12 23C12.552 23 13 22.552 13 22C13 21.448 12.552 21 12 21C7.033 21 3 16.967 3 12C3 7.033 7.033 3 12 3H13C17.418 3 21 6.582 21 11V13.25C21 13.714 20.816 14.159 20.487 14.487C20.159 14.816 19.714 15 19.25 15M19.25 15C18.786 15 18.341 14.816 18.013 14.487C17.684 14.159 17.5 13.714 17.5 13.25V8C17.5 7.465 17.08 7.028 16.551 7.001L16.5 7C15.948 7 15.5 7.448 15.5 8C15.5 8 15.5 10.935 15.5 13.25C15.5 14.245 15.895 15.198 16.598 15.902C17.302 16.605 18.255 17 19.25 17"
                      fill="white"
                    />
                  </svg>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow text-white placeholder-gray-300 z-30 bg-transparent outline-none text-sm md:text-base px-2"
                  />

                  <button
                    type="submit"
                    className="bg-white text-[#282828] text-sm md:text-base px-5 py-1.5 rounded-full font-medium hover:bg-gray-200 transition"
                  >
                    Subscribe
                  </button>
                </form>

                <p className="text-sm sm:text-base md:text-[18px] text-white/80 font-medium">
                  Stay up to date and enjoy a{" "}
                  <span className="font-semibold">10% off</span> any purchase
                </p>
              </div>
            </section>
            <footer key="footer" className="bg-black relative top-65 md:top-160 lg:top-190 text-white py-10 md:py-14 font-sans">
                  <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
                    {/* Left Section */}
                    <div className="space-y-5">
                      <Image
                        src={BusinessLogo}
                        alt="The Business Insight logo"
                        width={180}
                        height={60}
                        className="object-contain"
                        priority
                      />
                      <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                        The Business Insight has been a global media entity delivering
                        firsthand insights to investors, enterprises, and governments about
                        the most vibrant markets worldwide.
                      </p>
                      <div className="flex items-center space-x-4 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.4967 2.16016H4.50246C3.20921 2.16016 2.15961 3.20976 2.15961 4.50301V19.4973C2.15961 20.7906 3.20921 21.8402 4.50246 21.8402H19.4967C20.79 21.8402 21.8396 20.7906 21.8396 19.4973V4.50301C21.8396 3.20976 20.79 2.16016 19.4967 2.16016ZM8.25104 9.6573V18.5602H5.43961V9.6573H8.25104ZM5.43961 7.0661C5.43961 6.4101 6.00189 5.90873 6.84532 5.90873C7.68875 5.90873 8.21824 6.4101 8.25104 7.0661C8.25104 7.7221 7.72623 8.25158 6.84532 8.25158C6.00189 8.25158 5.43961 7.7221 5.43961 7.0661ZM18.5596 18.5602H15.7482C15.7482 18.5602 15.7482 14.2212 15.7482 13.8744C15.7482 12.9373 15.2796 12.0002 14.1082 11.9814H14.0707C12.9367 11.9814 12.4682 12.9467 12.4682 13.8744C12.4682 14.3008 12.4682 18.5602 12.4682 18.5602H9.65675V9.6573H12.4682V10.8568C12.4682 10.8568 13.3725 9.6573 15.1906 9.6573C17.0508 9.6573 18.5596 10.9365 18.5596 13.5277V18.5602Z"
                            fill="#CECECE"
                          />
                        </svg>
            
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5.2002 1.92041C3.3887 1.92041 1.9202 3.38891 1.9202 5.20041V18.3204C1.9202 20.1319 3.3887 21.6004 5.2002 21.6004H18.3202C20.1317 21.6004 21.6002 20.1319 21.6002 18.3204V5.20041C21.6002 3.38891 20.1317 1.92041 18.3202 1.92041H5.2002ZM6.17761 6.13755H9.89689L12.5381 9.8907L15.7431 6.13755H16.9145L13.0671 10.6421L17.8114 17.3833H14.093L11.0281 13.0288L7.30877 17.3833H6.13734L10.4991 12.2775L6.17761 6.13755ZM7.97136 7.0747L14.5817 16.4461H16.0176L9.40727 7.0747H7.97136Z"
                            fill="#CECECE"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.9997 1.99951C6.47673 1.99951 1.99973 6.47651 1.99973 11.9995C1.99973 17.0125 5.69273 21.1525 10.5047 21.8755V14.6495H8.03072V12.0205H10.5047V10.2715C10.5047 7.37551 11.9157 6.10451 14.3227 6.10451C15.4757 6.10451 16.0847 6.18951 16.3737 6.22851V8.52251H14.7317C13.7097 8.52251 13.3527 9.49151 13.3527 10.5835V12.0205H16.3477L15.9417 14.6495H13.3537V21.8965C18.2347 21.2355 21.9997 17.0615 21.9997 11.9995C21.9997 6.47651 17.5227 1.99951 11.9997 1.99951Z"
                            fill="#CECECE"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.9112 2.16016C2.86726 2.16016 2.15961 2.8683 2.15961 11.9117V12.0886C2.15961 21.132 2.86726 21.8402 11.9112 21.8402H12.088C21.132 21.8402 21.8396 21.132 21.8396 12.0886V12.0002C21.8396 2.87454 21.1252 2.16016 11.9996 2.16016H11.9112ZM17.9007 5.11216C18.4444 5.11068 18.8861 5.54961 18.8876 6.09327C18.8891 6.63693 18.4501 7.07868 17.9065 7.08016C17.3628 7.08163 16.9211 6.6427 16.9196 6.09904C16.9181 5.55538 17.3571 5.11363 17.9007 5.11216ZM11.9881 7.08016C14.7049 7.07376 16.9132 9.2718 16.9196 11.9886C16.926 14.7054 14.728 16.9138 12.0111 16.9202C9.29431 16.9266 7.086 14.7285 7.07961 12.0117C7.07321 9.29486 9.27125 7.08655 11.9881 7.08016ZM11.9929 9.04816C10.3624 9.05209 9.04367 10.3774 9.04761 12.0078C9.05154 13.6378 10.3763 14.9561 12.0063 14.9522C13.6368 14.9482 14.9555 13.6234 14.9516 11.9934C14.9477 10.3629 13.6229 9.04422 11.9929 9.04816Z"
                            fill="#CECECE"
                          />
                        </svg>
                      </div>
                    </div>
            
                    {/* Middle Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company</h3>
                      <ul className="space-y-3 text-gray-400">
                        <li className="hover:text-[#E25B2B] cursor-pointer transition">
                          About us
                        </li>
                        <li className="hover:text-[#E25B2B] cursor-pointer transition">
                          Terms of Use
                        </li>
                        <li className="hover:text-[#E25B2B] cursor-pointer transition">
                          Cookies Policy
                        </li>
                        <li className="hover:text-[#E25B2B] cursor-pointer transition">
                          Career
                        </li>
                        <li className="hover:text-[#E25B2B] cursor-pointer transition">
                          Privacy Policy
                        </li>
                      </ul>
                    </div>
            
                    {/* Right Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact</h3>
                      <ul className="space-y-4 text-gray-400">
                        <li className="flex items-center gap-3">
                          <Phone size={18} className="text-[#E25B2B]" />
                          <span>+123 456 7890</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.4009 19.2C15.8965 20.3302 14.0265 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V13.5C21 14.8807 19.8807 16 18.5 16C17.1193 16 16 14.8807 16 13.5V8M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                              stroke="#E8602E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>support@tbinm.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
            
                  {/* Bottom Section */}
                  <div className="border-t border-gray-800 mt-10 pt-6 text-start px-9 text-gray-500 text-sm">
                    © 2025 IBJ Studio x Hyperthesis. All rights reserved.
                  </div>
                </footer>
          </AnimatePresence>
        </div>

        {/* === BACK TO TOP BUTTON === */}
        {scrolled && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleReverse}
            className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 z-50 bg-orange-500/80 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full shadow-lg"
          >
            <Image
              src={vector}
              alt="vector"
              width={20}
              height={20}
              className="sm:w-[30px] sm:h-[30px]"
            />
          </motion.button>
        )}
      </div>
    </main>
  );
};

export default Hero;