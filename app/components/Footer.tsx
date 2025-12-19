import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Linkedin, X, Github, Instagram } from "lucide-react";
import logo from "@/public/logo.png"; // replace with your actual path
import { BusinessLogo, mailbox } from "@/public";

export default function Footer() {
  const CurrentYear = new Date().getFullYear();
  return (
    <>
      <section
        key="Newsletter"
        className="relative bg-[#E25B2B] text-white rounded-2xl shadow-lg max-w-[1000px] mx-[16px] lg:mx-auto mt-16  lg:mt-28 overflow-visible px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between mb-12"
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
        <div className="mt-32 sm:mt-36 md:mt-0 md:ml-[310px] lg:ml-[380px] flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 font-sans w-full px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-[30px] font-bold leading-snug md:max-w-[350px] lg:max-w-[520px]">
            Join us! Subscribe to <br /> our weekly newsletter
          </h2>

          <form className="flex items-center flex-nowrap bg-[#2D0C00] rounded-full px-3 py-2 gap-2 w-full max-w-[450px]">
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
              className="flex-1 min-w-0 text-white placeholder-gray-300 bg-transparent outline-none text-sm md:text-base"
            />

            <button
              type="submit"
              className="bg-white text-[#282828] text-[10px] md:text-base px-4 py-1 rounded-full font-medium cursor-pointer hover:bg-gray-200 transition whitespace-nowrap flex-shrink-0"
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
      <footer
        key="footer"
        className="bg-black z-30 hide-scrollbar relative text-white py-10 md:py-14 font-sans"
      >
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
              firsthand insights to investors, enterprises, and governments
              about the most vibrant markets worldwide.
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
            <ul className="space-y-3  text-white">
              <li className="hover:text-[#E25B2B] cursor-pointer transition w-fit">
                <Link href="/about">About us</Link>
              </li>
              <li className="hover:text-[#E25B2B] cursor-pointer transition w-fit">
                <Link href="/Terms">Terms of Use</Link>
              </li>
              <li className="hover:text-[#E25B2B] cursor-pointer transition w-fit">
                <Link href="/cookies">Cookies Policy</Link>
              </li>
              <li className="hover:text-[#E25B2B] cursor-pointer transition w-fit">
                <Link href="/career">Career</Link>
              </li>
              <li className="hover:text-[#E25B2B] cursor-pointer transition w-fit">
                <Link href="/privacy">Privacy Policy</Link>
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
        <div className="border-t border-gray-900 mt-10 pt-6  px-9 text-white flex flex-col lg:flex-row text-center justify-between text-sm">
          <p>© {CurrentYear} The Business Insights. All rights reserved.</p>
          <p>Designed by IBJ Studio x Hyperthesis.</p>
        </div>
      </footer>
    </>
  );
}
