"use client";
import React from "react";
import { motion } from "framer-motion";
import GlassCard from "@/shared/components/ui/GlassCard";
import SectionHeading from "@/shared/components/ui/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Connect Sources",
    description:
      "Import RSS feeds, subreddits, and social accounts in seconds.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    delay: 0,
  },
  {
    num: "02",
    title: "Filter Noise",
    description:
      "Set keyword rules and muting filters. You decide what gets through.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    ),
    delay: 0.2,
  },
  {
    num: "03",
    title: "Focus",
    description:
      "Consume content in a calm, coherent grid designed for reading.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    delay: 0.4,
  },
];

const Workflow = () => {
  return (
    <section className="py-24 relative z-10">
      <SectionHeading title="Your feed your rules" subtitle="How it works" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Mobile Hidden) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay }}
            >
              <GlassCard className="h-full p-8 flex flex-col items-center text-center relative hover:bg-white/10 transition-colors duration-300 group">
                {/* Number Badge */}
                {/* Number Badge */}
                <div className="mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-300 backdrop-blur-sm">
                  {step.num}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
