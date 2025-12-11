"use client";

import { useState } from "react";
import Preloader from "./components/Preloader";
import ScrollToTop from "./ScrollToTop";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
      <ScrollToTop />
      {preloaderDone && children}
    </>
  );
}
