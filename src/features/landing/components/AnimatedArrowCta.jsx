"use client";
import React from "react";
import { motion } from "framer-motion";
import GlowingButton from "@/shared/components/ui/GlowingButton";

const AnimatedArrowCta = ({ onStart, className = "" }) => {
  // Arrow animation sequence
  const arrowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: [0.2, 1, 0.2],
      x: 0,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        delay: i * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      className={`flex flex-row items-center justify-center gap-3 sm:gap-8 ${className}`}
    >
      {/* Label Box */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative group shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-md -z-10 group-hover:blur-lg transition-all duration-300" />
        <div className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-sm sm:text-lg font-medium text-gray-200 tracking-wide whitespace-nowrap">
            Start Your Feed
          </span>
        </div>
      </motion.div>

      {/* Animated Arrows - Reduce count and size on mobile */}
      <div
        className="flex items-center gap-0.5 sm:gap-1 text-blue-400 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Fewer arrows on mobile to save space */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-2xl font-bold"
          >
            ❯
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="shrink-0"
      >
        <GlowingButton
          onClick={onStart}
          size="lg"
          variant="primary"
          className="min-w-[120px] sm:min-w-[160px] text-sm sm:text-base px-5 sm:px-8 py-2 sm:py-4"
        >
          Get Started
        </GlowingButton>
      </motion.div>
    </div>
  );
};

export default AnimatedArrowCta;
