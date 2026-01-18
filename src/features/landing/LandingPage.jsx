"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopicsTicker from "./components/TopicsTicker";
import BentoGrid from "./components/BentoGrid";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";

export default function LandingPage({ openAuthModal }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar openModal={openAuthModal} />

        <main>
          <Hero openModal={openAuthModal} />
          <TopicsTicker />
          <BentoGrid />
          <Workflow />
        </main>

        <Footer />
      </div>
    </div>
  );
}
