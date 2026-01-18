"use client";
import React from "react";
import GlowingButton from "@/shared/components/ui/GlowingButton";

const Navbar = ({ openModal }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent block">
              PersonalFeed
            </span>
          </div>

          {/* Features Tagline */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-400 absolute left-1/2 -translate-x-1/2">
            <span>Unified feed</span>
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span>Real-time sources</span>
            <span className="w-1 h-1 rounded-full bg-purple-500" />
            <span>Private by design</span>
            <span className="w-1 h-1 rounded-full bg-indigo-500" />
            <span>Drag & drop layout</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
