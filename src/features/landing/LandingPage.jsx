'use client';
import React from 'react';
import useMouseGlow from './hooks/useMouseGlow';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import ContentPreviewSection from './sections/ContentPreviewSection';
import SocialProofSection from './sections/SocialProofSection';
import FooterSection from './sections/FooterSection';

export default function LandingPage({ openAuthModal }) {
  const { handleMouseMove, glowStyle } = useMouseGlow();

  return (
    <>
      {/* Header - Outside overflow container for sticky positioning */}
      <HeaderSection />

      <main
        className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Gradient Orbs */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-500/20 blur-[120px]" />

        {/* Mouse Glow Effect */}
        <div className="pointer-events-none absolute inset-0 transition-[background] duration-300" style={glowStyle} />

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16 lg:pb-20">
          {/* Hero Section */}
          <HeroSection openModal={openAuthModal} />

          {/* Feature Cards */}
          <FeaturesSection />

          {/* Content Preview Section */}
          <ContentPreviewSection />

          {/* Social Proof Section */}
          <SocialProofSection />
        </div>

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}