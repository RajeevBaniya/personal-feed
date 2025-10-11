'use client';
import React from 'react';

export default function HeaderSection() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PersonalFeed
            </h1>
          </div>

          {/* Center tagline - desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="inline-flex items-center gap-3 px-0 py-0 text-xs text-gray-300">
              <span className="whitespace-nowrap">Unified feed</span>
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
              <span className="whitespace-nowrap">Real‑time sources</span>
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
              <span className="whitespace-nowrap">Private by design</span>
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
              <span className="whitespace-nowrap">Drag &amp; drop layout</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="w-10" />
        </div>
      </div>
    </header>
  );
}