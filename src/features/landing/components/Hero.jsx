"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedArrowCta from "./AnimatedArrowCta";

const Hero = ({ openModal }) => {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 sm:py-32 text-center px-4 z-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300 backdrop-blur-md shadow-lg shadow-blue-500/10">
          ✨ Try now to explore it
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl"
      >
        Welcome to <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-gradient-x bg-[length:200%_auto]">
          Personal Feed.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
      >
        Your personalized hub for daily news, movies, music and social updates.
        Gather, reorder and save the content that matters to you
      </motion.p>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-3xl"
      >
        <AnimatedArrowCta
          onStart={() => openModal("signup")}
          className="mt-4"
        />
      </motion.div>

      {/* Stats / Social Proof snippet */}
      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-blue-200/60"
      >
        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
          🗞️ Unified Feed
        </span>
        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
          📡 Real-time Sources
        </span>
        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
          🔒 Private by Design
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
