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
import MoreInterviews from "./components/MoreInterviews";
import ScrollToTop from "./ScrollToTop";
import ScrollBackButton from "./components/ScrollBackButton";
import Dhl from "./components/Dhl";


export default function Home() {

  const [preloaderDone, setPreloaderDone] = useState(false);


  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* <Navbar /> */}
      <HeroPage preloaderDone={preloaderDone} />
      <ExclusiveInterviewsSlider />
      <TrendingArticles />
      <StaticFeatureSection />
      <FeaturedReports />
      <EventHighlight />
      <Dhl />
      <MoreInterviews />
      <Footer />
      <ScrollBackButton />
    </main>
  );
}
