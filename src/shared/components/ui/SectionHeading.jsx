"use client";
import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-20 ${alignClasses[align]} ${className}`}
    >
      {/* Subtitle / Badge */}
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide uppercase mb-4 inline-block backdrop-blur-sm">
            {subtitle}
          </span>
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
          {title}
        </span>
      </motion.h2>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
};

export default SectionHeading;
