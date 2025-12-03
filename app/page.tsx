"use client";

import { useState } from "react";

import { useEffect } from "react";
import ExclusiveInterviewsSlider from "./components/ExclusiveInterviewSlider";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HeroPage from "./components/HeroPage";
import Navbar from "./components/Navbar";
import TrendingArticles from "./components/TrendingArticles";
import StaticFeatureSection from "./components/VideoSection";
import FeaturedReports from "./components/FeaturedReports";
import EventHighlight from "./components/EventHighlight";


export default function Home() {

  const [interviews, setInterviews] = useState<any[]>([]);
  const [visibleInterviews, setVisibleInterviews] = useState(4);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/interviews");
      const data = await res.json();
      setInterviews(data);
    }
    loadData();
  }, []);
  return (
    <main className="relative min-h-screen bg-black">
      {/* <Navbar /> */}
      <HeroPage />
      <ExclusiveInterviewsSlider />
      <TrendingArticles />
      <StaticFeatureSection />
      <FeaturedReports />
      <EventHighlight />
      {/* <Footer /> */}
    </main>
  );
}
