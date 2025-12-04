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


export default function Home() {


  return (
    <main className="relative min-h-screen bg-black">
      {/* <Navbar /> */}
      <HeroPage />
      <ExclusiveInterviewsSlider />
      <TrendingArticles />
      <StaticFeatureSection />
      <FeaturedReports />
      <EventHighlight />
      <MoreInterviews />
      <Footer />
    </main>
  );
}
