"use client";
import React from "react";
import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  onClick,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl";
  const hoverClasses = hoverEffect
    ? "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300"
    : "";

  // Combine classes safely
  const finalClasses = `${baseClasses} ${hoverClasses} ${className}`.trim();

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverEffect ? { y: -5 } : {}}
        whileTap={hoverEffect ? { scale: 0.98 } : {}}
        className={finalClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        {...props}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        {children}
      </motion.div>
    );
  }

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
