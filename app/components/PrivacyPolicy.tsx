"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { BusinessLogo, InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}

      {/* Navbar */}
      <Navbar />

      <section>
        <div className="absolute -top-250 w-full h-full">
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
          <h1 className="text-[36px] md:text-[55px] lg:text-[73px] mb-12">
            Privacy Policy
          </h1>

          <div className="font-sans">
            <h1 className="font-bold">Privacy Policy</h1>
            <p className="pb-5">
              The Business insight (brand of GBM Group) is committed to ensuring
              the privacy and security of your personal information. This
              Privacy Policy outlines the types of personal data we collect, how
              it is used, and the choices you have regarding your information.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Information Collection and Use</h1>
            <p className="pb-2">
              We may collect personal information, such as your name, email
              address, and any additional details voluntarily provided by you
              when you interact with our website, subscribe to our newsletters,
              or engage with our services. This information is used to provide
              you with the requested services, improve our offerings, and
              communicate with you.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Third-Party Disclosure</h1>
            <p className="pb-5">
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties. However, we may share
              information with trusted third parties who assist us in operating
              our website, conducting our business, or servicing you, provided
              that those parties agree to keep this information confidential.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Data Security</h1>
            <p className="pb-2">
              We prioritize the security of your personal information and
              implement reasonable security measures to protect against
              unauthorized access, alteration, disclosure, or destruction
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Links to Third-Party Sites</h1>
            <p className="pb-2">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these sites.
              We encourage users to read the privacy policies of any linked
              websites as their practices may differ from ours.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Children’s Privacy</h1>
            <p className="pb-2">
              Our services are not intended for individuals under the age of 13.
              We do not knowingly collect personal information from children. If
              you believe that we may have collected information from a child,
              please contact us, and we will promptly take steps to remove that
              information from our records
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Changes to This Privacy Policy</h1>
            <p className="pb-2">
              We reserve the right to update this Privacy Policy periodically.
              Any changes will be posted on this page with an updated date. By
              continuing to use our website, you acknowledge and agree to the
              updated Privacy Policy.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="font-bold">Contact Us</h1>
            <p className="pb-2">
              If you have any questions or concerns regarding this Privacy
              Policy or the handling of your personal information, please
              contact us at <a
    href="mailto:helloibj.studio@gmail.com?subject=Career%20Application&body=Hello%2C%20I%20would%20like%20to%20apply%20for%20a%20position%20at%20The%20Business%20Insight."
    className="text-[#E8602E] underline hover:text-orange-400 transition-colors"
  >
    helloibj.studio@gmail.com
  </a>
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

export default PrivacyPolicy;
