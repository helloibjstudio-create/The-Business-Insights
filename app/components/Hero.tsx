"use client";

import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  articles,
  BusinessLogo,
  dhl,
  mailbox,
  moreInterviews,
  reports,
  subtract,
  thirdOrange,
} from "@/public";
import { Hedvig_Letters_Serif } from "next/font/google";
import HeroParallax from "./HeroParallax";
import { useEffect, useState } from "react";
import ScrollBackButton from "./ScrollBackButton";
import Footer from "./Footer";
import Link from "next/link";
import Navbar from "./Navbar";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

interface ExclusiveInterview {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
}

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

const Hero = () => {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [exclusiveInterviews, setExclusiveInterviews] = useState<
      ExclusiveInterview[]
      >([]);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/exclusiveInterviews`)
        .then((res) => res.json())
        .then((data) => setExclusiveInterviews(data))
        .catch((err) => console.error("Error fetching interviews:", err));
      }, []);
      const [interviews, setInterviews] = useState<Interview[]>([]);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/interviews`)
        .then((res) => res.json())
        .then((data) => setInterviews(data))
        .catch((err) => console.error("Error fetching interviews:", err));
      }, []);
      const [articles, setArticles] = useState<Interview[]>([]);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/articles`)
        .then((res) => res.json())
        .then((data) => setArticles(data))
        .catch((err) => console.error("Error fetching interviews:", err));
      }, []);
      const limitedInterviews = interviews.slice(0, 9);
        const featured = interviews[0];
  const others = interviews.slice(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      setVisible(window.scrollY > vh * 0.7);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden relative bg-transparent">
      <HeroParallax />

      <AnimatePresence mode="wait">
        <motion.div className="max-w-7xl relative text-white mx-auto px-4 sm:px-6 md:px-10  ">
          {/* --- ARTICLES SECTION --- */}
          <div key="articles-section" className="flex flex-col md:flex-row md:items-center font-sans md:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-[32px] sm:text-[48px] md:text-[60px] font-semibold font-sans">
                Articles
              </h2>
              <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] mt-2 max-w-[600px]">
                Explore our latest articles and insights for a fresh perspective
                on industry trends and news.
              </p>
            </div>
            <Link href="/articles"><motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 px-6 sm:px-8 py-3 rounded-lg text-[16px] sm:text-[18px] transition"
            >
              View All Articles
            </motion.button></Link>
          </div>

          {/* --- ARTICLE CARDS --- */}
          <div className="grid grid-cols-1 font-sans sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform bg-black/20"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={article.image_url}
                    alt={article.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pt-6 px-4 pb-8">
                  <h3 className="font-semibold text-[20px] sm:text-[22px] md:text-[26px]">
                    {article.name}
                  </h3>
                  <p className="text-gray-300 text-[16px] sm:text-[18px] py-2.5 mb-3">
                    {article.description}
                  </p>
                  <Link
                href={`/articles/${article.id}`}
                className="inline-flex items-center text-orange-400 hover:text-orange-500 text-[14px] sm:text-[16px]"
              >
                Read More <ArrowUpRight size={16} className="ml-1" />
              </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- DHL BANNER --- */}
        <div key="dhl-banner" className="relative w-full min-h-[50vh] sm:h-[70vh] md:h-screen mb-20 md:mb-0">
          <Image
            src={thirdOrange}
            alt="Background"
            fill
            className="absolute inset-0 object-contain lg:object-cover  h-full w-full"
          />
          <Image
            src={dhl}
            alt="DHL Banner"
            width={1280}
            height={333}
            className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain w-[90%] sm:w-[80%] lg:w-[70%]"
          />
        </div>
    
        <section
  key="more-interviews"
  className="max-w-7xl mx-auto w-[90%] text-white py-16 px-4 -top-40 sm:px-6 md:px-12 lg:px-20 backdrop-blur-2xl relative font-sans bg-white/3 border border-white/10 rounded-2xl"
>
  <h2 className="text-[32px] sm:text-[48px] md:text-[60px] font-semibold mb-8 md:mb-12 text-center md:text-left">
    More Interviews
  </h2>

  {interviews.length > 0 ? (
    <>
      {/* Featured */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-12 items-center">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={interviews[0].image_url}
            alt={interviews[0].name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center text-center md:text-left px-2">
          <h3 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold">
            {interviews[0].name}
          </h3>
          <p className="italic text-[18px] sm:text-[20px] md:text-[24px] text-white mb-3">
            {interviews[0].sector}
          </p>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-white mb-6 italic">
            {interviews[0].description}
          </p>
          <Link href={"/Interviews"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 px-6 sm:px-8 py-3 rounded-lg text-[16px] sm:text-[18px] transition"
            >
              Read More
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviews.slice(0, 9).map((interview, i) => (
          <motion.div
            key={interview.id || i}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="rounded-xl overflow-hidden hover:bg-[#1b1b1b]/10 hover:scale-105 transition"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={interview.image_url}
                alt={interview.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 text-center md:text-left">
              <p className=" text-[14px] sm:text-[20px] mb-1">
                {interview.name}
              </p>
              <h4 className="font-semibold text-[18px] sm:text-[20px] mb-3">
                {interview.sector}
              </h4>
              <Link
                href={`/Interviews/${interview.id}`}
                className="inline-flex items-center text-orange-400 hover:text-orange-500 text-[14px] sm:text-[16px]"
              >
                Read More <ArrowUpRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <Link href="/Interviews">
        <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg bg-orange-500 cursor-pointer font-sans hover:bg-white text-white hover:text-orange-500 text-[16px] sm:text-[18px]">
          More Interviews
        </button></Link>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-400 text-lg">Loading interviews...</p>
  )}
</section>
    

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
              Browse our latest publications and gain a deeper understanding of
              emerging trends and critical topics through our in-depth analysis,
              interviews with local business and political leaders, and
              comprehensive data and statistics.
            </p>

            <Link href="/reports"><button
              className="inline-flex items-center justify-center px-6 sm:px-[37px] py-3 sm:py-[13px] mt-4 font-sans rounded-[10px] bg-orange-500 text-white hover:bg-white cursor-pointer font-medium hover:text-orange-400 text-base sm:text-[20px] w-[160px] sm:w-[202px] transition-all duration-300"
            >
              More Reports
            </button></Link>
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
          className=" w-full flex flex-col justify-around items-center overflow-visible bg-black py-20 md:py-32"
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
            <p className="w-full max-w-[1103px] text-center mx-auto text-base sm:text-lg md:text-[21px] font-sans font-normal md:font-medium leading-relaxed text-white z-20">
              Engage with us at the forefront of your business. We not only
              participate in but also organize impactful business conferences
              and exhibitions, fostering connections and propelling industries
              forward. Join us in shaping the future of your industry!
            </p>

            {/* Button */}
            <Link href="/events">
            <button
              className="flex items-center px-6 sm:px-8 md:px-[37px] py-3 sm:py-3.5 md:py-[13px] mt-6 md:mt-5 font-sans rounded-[10px] bg-[#E8602E] hover:bg-white cursor-pointer m-auto font-medium hover:text-[#E8602E] text-base sm:text-lg md:text-[20px] z-20 relative transition-all duration-300"
            >
              Learn More
            </button></Link>

            {/* Overlay/Subtract Image */}
            <div className="relative top-5 left-0 w-full h-[220px] sm:h-[500px] md:h-[750px] z-10 overflow-visible pointer-events-none">
              <Image
                src={subtract}
                alt="Subtract overlay"
                fill
                className="object-cover md:object-cover glow-orange"
                priority
              />
            </div>
          </div>
        </section>
        <section
          key="Newsletter"
          className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[1000px] mx-auto  lg:mt-56 overflow-visible px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between"
        >
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
        <Footer />
      </AnimatePresence>

      <ScrollBackButton />
    </main>
  );
};

export default Hero;
