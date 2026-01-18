"use client";
import React from "react";
import { motion } from "framer-motion";
import GlassCard from "@/shared/components/ui/GlassCard";
import SectionHeading from "@/shared/components/ui/SectionHeading";

const BentoGrid = () => {
  return (
    <section className="py-24 relative z-10">
      <SectionHeading
        title="Everything you need in one place"
        subtitle="Features"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {/* Large Card - Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2"
        >
          <GlassCard className="h-full min-h-[400px] p-8 flex flex-col justify-end group">
            <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-[length:100%_100%] bg-no-repeat group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-0" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">
                Unified Dashboard
              </h3>
              <p className="text-gray-300">
                News next to Music. Movies next to Tweets. Your entire digital
                life organized in a single, coherent grid used by thousands.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tall Card - Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:row-span-2"
        >
          <GlassCard className="h-full min-h-[400px] p-8 flex flex-col relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            {/* Visual: Floating Widgets */}
            <div className="flex-1 relative w-full h-[200px] mb-4 perspective-1000">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

              {/* Widget 1 (Music) */}
              <motion.div
                className="absolute top-6 left-0 w-32 h-32 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 mb-3 flex items-center justify-center">
                  <span className="text-lg">🎵</span>
                </div>
                <div className="h-2 w-20 bg-white/10 rounded mb-2" />
                <div className="h-2 w-12 bg-white/5 rounded" />
              </motion.div>

              {/* Widget 2 (Task - Draggable Look) */}
              <motion.div
                className="absolute top-16 right-0 w-40 h-28 rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4 backdrop-blur-md shadow-xl shadow-blue-500/5 z-10"
                animate={{ y: [0, 10, 0] }}
                whileHover={{ scale: 1.05, rotate: -2, cursor: "grab" }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded mb-2" />
                <div className="h-2 w-2/3 bg-white/5 rounded" />
              </motion.div>
            </div>

            <div className="mt-auto relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl mb-4 flex items-center justify-center text-blue-400">
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Drag & Drop
              </h3>
              <p className="text-gray-400 text-sm">
                Fully customizable interface. Design your perfect morning
                routine by dragging widgets exactly where you want them.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Small Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6 h-full hover:bg-white/10 border-white/5">
            <h4 className="text-xl font-semibold text-white mb-2">Dark Mode</h4>
            <p className="text-gray-400 text-sm">
              Validating eye comfort at night.
            </p>
          </GlassCard>
        </motion.div>

        {/* Small Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6 h-full hover:bg-white/10 border-white/5">
            <h4 className="text-xl font-semibold text-white mb-2">Real-time</h4>
            <p className="text-gray-400 text-sm">Updates as they happen.</p>
          </GlassCard>
        </motion.div>

        {/* Small Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-6 h-full hover:bg-white/10 border-white/5">
            <h4 className="text-xl font-semibold text-white mb-2">Secure</h4>
            <p className="text-gray-400 text-sm">Privacy focused.</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
