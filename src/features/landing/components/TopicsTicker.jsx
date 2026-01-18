"use client";
import React from "react";
import { motion } from "framer-motion";

const TopicsTicker = () => {
  const topics = [
    {
      label: "🚀 Tech",
      color: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    },
    {
      label: "🎬 Movies",
      color: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    },
    {
      label: "🎵 Music",
      color: "bg-green-500/10 border-green-500/20 text-green-300",
    },
    {
      label: "⚽ Sports",
      color: "bg-orange-500/10 border-orange-500/20 text-orange-300",
    },
    {
      label: "💼 Business",
      color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    },
    {
      label: "🎨 Design",
      color: "bg-pink-500/10 border-pink-500/20 text-pink-300",
    },
    {
      label: "🧠 Science",
      color: "bg-teal-500/10 border-teal-500/20 text-teal-300",
    },
    {
      label: "🎮 Gaming",
      color: "bg-red-500/10 border-red-500/20 text-red-300",
    },
    {
      label: "💰 Crypto",
      color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
    },
    {
      label: "✈️ Travel",
      color: "bg-sky-500/10 border-sky-500/20 text-sky-300",
    },
    {
      label: "🍔 Food",
      color: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    },
    {
      label: "🏋️ Health",
      color: "bg-rose-500/10 border-rose-500/20 text-rose-300",
    },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
          Curate your feed with
        </p>

        {/* Infinite Scroll Mask */}
        <div
          className="w-full overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Framer Motion - Interactive Slider */}
          <motion.div
            className="flex gap-4 sm:gap-6 items-center w-max cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }} // Simple constraints for manual drag feel
            animate={{ x: [0, -1035] }} // Approximate width of one set of items
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }} // Note: Framer handles hover pause differently typically, but drag works naturally
          >
            {/* Double list for loop */}
            {[...topics, ...topics, ...topics].map((topic, index) => (
              <motion.span
                key={`${topic.label}-${index}`}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${topic.color} transition-transform hover:scale-105 select-none`}
              >
                {topic.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TopicsTicker;
