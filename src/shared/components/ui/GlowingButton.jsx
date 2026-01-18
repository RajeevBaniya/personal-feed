"use client";
import React from "react";
import { motion } from "framer-motion";

const GlowingButton = ({
  children,
  onClick,
  variant = "primary", // primary, secondary, ghost
  className = "",
  size = "md", // sm, md, lg
  ...props
}) => {
  const getVariantStyles = (v) => {
    switch (v) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] border-transparent";
      case "secondary":
        return "bg-white/10 text-white border-white/10 hover:bg-white/20 backdrop-blur-md";
      case "ghost":
        return "bg-transparent text-gray-300 hover:text-white hover:bg-white/5";
      default:
        return "";
    }
  };

  const getSizeStyles = (s) => {
    switch (s) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-8 py-4 text-lg font-semibold";
      case "md":
      default:
        return "px-6 py-3 text-base font-medium";
    }
  };

  const baseStyles =
    "relative inline-flex items-center justify-center rounded-xl border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const finalClasses =
    `${baseStyles} ${getVariantStyles(variant)} ${getSizeStyles(size)} ${className}`.trim();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {/* Internal glow for primary buttons */}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default GlowingButton;
