import { BusinessLogo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav id="navbar" className="absolute top-0 left-0 w-full flex justify-between items-center  px-12 py-[51px] text-white z-10">
      <div className="text-2xl font-bold">
        <Link href="/Hero">
          <Image
          src={BusinessLogo}
          alt="Business Insight Logo"
          width={244}
          height={50}
        />
        </Link>
      </div>
      <ul className="hidden md:flex space-x-8 text-[16px] font-sans font-[500px]">
        <li><Link href="/Interviews" className="hover:text-orange-400">Interviews</Link></li>
        <li><Link href="/Articles" className="hover:text-orange-400">Articles</Link></li>
        <li><Link href="/Reports" className="hover:text-orange-400">Reports</Link></li>
        <li><Link href="/Events" className="hover:text-orange-400">Events</Link></li>
        <li><Link href="/About" className="hover:text-orange-400">About Us</Link></li>
      </ul>
      <div className="border border-gray-400 rounded-xl px-3 py-2 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;
