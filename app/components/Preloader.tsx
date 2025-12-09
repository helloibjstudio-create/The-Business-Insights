"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BusinessHero, BusinessLogo } from "@/public";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsDone(true), 300);
        return 100;
      }
      return prev + 0.56;
    });
  }, 50);

  return () => clearInterval(interval);
}, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isDone ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Logo reveal */}
      <div className="absolute z-200 inset-0 flex items-center justify-center">
        <Image
          src={BusinessLogo} // <-- replace with your logo path
          alt="Logo"
          width={560}
          height={760}
          className="opacity-0 max-w-[90%] animate-logoReveal"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={BusinessHero} // <-- replace with your logo path
          alt="Logo"
         fill
        className="opacity-0 max-w-[100%] min-h-screen animate-logoReveal"
        />
      </div>
      
      <div className="absolute w-screen h-screen bg-black/10 "/>

      {/* Progress Bar */}
      <div className="w-3/4 z-300 max-w-md">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-white text-center mt-3 text-sm">
  {progress.toFixed(2)}%
</p>
      </div>
    </div>
  );
}
