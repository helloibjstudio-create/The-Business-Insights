"use client";

import { useEffect, useRef, useState } from "react";

export default function useHeroScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [reversing, setReversing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const width = window.innerWidth;

      // determine breakpoint
      let exclusiveTrigger = vh * 1.2; // default desktop
      if (width < 640) exclusiveTrigger = vh * 1; // mobile
      else if (width < 1024) exclusiveTrigger = vh * 1.1; // tablet

      // prevent re-triggering while auto-scrolling
      if (isAutoScrolling.current) return;

      // === Scroll Down (to next section) ===
      if (!scrolled && y > vh * 0.25) {
        isAutoScrolling.current = true;
        setScrolled(true);

        window.scrollTo({
          top: exclusiveTrigger,
          behavior: "smooth",
        });

        // small buffer to re-enable manual scroll
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 1500);
      }

      // === Scroll Up (back to hero) ===
      if (scrolled && y < vh * 0.15 && !isAutoScrolling.current) {
        isAutoScrolling.current = true;
        setScrolled(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 1500);
      }

      // === Show articles section ===
      const articleTrigger = exclusiveTrigger + vh * 0.5;
      if (y > articleTrigger && !showArticles) setShowArticles(true);
      else if (y < articleTrigger * 0.7 && showArticles)
        setShowArticles(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, showArticles, loaded]);

  // === Manual Reverse Button or Trigger ===
  const handleReverse = () => {
    setReversing(true);
    setShowArticles(false);
    setScrolled(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setReversing(false), 1000);
    }, 50);
  };

  return { scrolled, showArticles, reversing, handleReverse };
}
