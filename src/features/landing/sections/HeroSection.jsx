'use client';
import React from 'react';
import AnimatedChevrons from '../components/AnimatedChevrons';

export default function HeroSection({ openModal }) {
  return (
    <div className="text-center mb-12 lg:mb-20 mt-2 sm:mt-6">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-5 py-2 mb-8 text-sm text-blue-300 shadow-lg shadow-blue-500/10">
        <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
        <span className="font-medium">Try now to explore it</span>
      </div>
      
      <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-4">
        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Welcome to
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          PersonalFeed
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4">
        Your personalized hub for daily news, movies, music and social updates.
        <br className="hidden sm:block" />
        <span className="text-blue-400 font-semibold">Gather, reorder and save</span> the content that matters to you.
      </p>
      
      <div className="flex flex-row gap-0 justify-center items-center mb-16">
        <button  
          onClick={() => openModal('signin')}
          className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20">
          <span className="relative z-10">Start Your Feed</span>
        </button>
        
        <AnimatedChevrons />
        
        <button
          onClick={() => openModal('signin')}
          className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-2xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02]"
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
        </button>
      </div>
    </div>
  );
}