"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BusinessHero, BusinessLogo } from "@/public";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");

    if (hasSeenPreloader) {
      return;
    }

    setIsDone(false);
    sessionStorage.setItem("hasSeenPreloader", "true");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 300);
          return 100;
        }
        return prev + 1.12;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 opacity-100">
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Image
          src={BusinessLogo}
          alt="Logo"
          width={560}
          height={760}
          className="opacity-0 max-w-[90%] animate-logoReveal"
        />
      </div>

      <div className="absolute inset-0 z-10">
        <Image
          src={BusinessHero}
          alt="Hero"
          fill
          priority
          className="object-cover opacity-0 animate-logoReveal"
        />
      </div>

      <div className="absolute inset-0 bg-black/10" />

      <div className="w-3/4 max-w-md z-30">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white text-center mt-3 text-sm">
          {progress.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
