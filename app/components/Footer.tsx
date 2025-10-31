import Image from "next/image";
import { Phone, Mail, Linkedin, X, Github, Instagram } from "lucide-react";
import logo from "@/public/logo.png"; // replace with your actual path
import { BusinessLogo } from "@/public";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:py-14 border-t border-gray-800">
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
            <Linkedin size={20} className="hover:text-[#E25B2B] cursor-pointer" />
            <X size={20} className="hover:text-[#E25B2B] cursor-pointer" />
            <Github size={20} className="hover:text-[#E25B2B] cursor-pointer" />
            <Instagram size={20} className="hover:text-[#E25B2B] cursor-pointer" />
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-[#E25B2B] cursor-pointer transition">About us</li>
            <li className="hover:text-[#E25B2B] cursor-pointer transition">Terms of Use</li>
            <li className="hover:text-[#E25B2B] cursor-pointer transition">Cookies Policy</li>
            <li className="hover:text-[#E25B2B] cursor-pointer transition">Career</li>
            <li className="hover:text-[#E25B2B] cursor-pointer transition">Privacy Policy</li>
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
              <Mail size={18} className="text-[#E25B2B]" />
              <span>support@tbinm.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2025 IBJ Studio x Hyperthesis. All rights reserved.
      </div>
    </footer>
  );
}
