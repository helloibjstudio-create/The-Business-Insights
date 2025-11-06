import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Linkedin, X, Github, Instagram } from "lucide-react";
import logo from "@/public/logo.png"; // replace with your actual path
import { BusinessLogo } from "@/public";

export default function Footer() {
  return (
    <footer key="footer" className="bg-black z-30 relative text-white py-10 md:py-14 font-sans">
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
          <p className="text-sm text-white leading-relaxed max-w-sm">
            The Business Insight has been a global media entity delivering
            firsthand insights to investors, enterprises, and governments about
            the most vibrant markets worldwide.
          </p>
          <div className="flex items-center space-x-4 text-white">
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
          <ul className="space-y-3 text-white">
            <li className="hover:text-[#E25B2B] cursor-pointer transition">
              About us
            </li>
            <Link href="/Terms">
            <li className="hover:text-[#E25B2B] cursor-pointer transition">
              Terms of Use
            </li>
            </Link>
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
          <ul className="space-y-4 text-white">
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
      <div className="border-t border-gray-900 mt-10 pt-6 text-start px-9 text-white text-sm">
        © 2025 IBJ Studio x Hyperthesis. All rights reserved.
      </div>
    </footer>
  );
}
