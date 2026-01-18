"use client";
import React from "react";
import { footerData } from "@/data/footerData";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-xl z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Brand Column - Full width on mobile/tablet, 1 col on desktop */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-2">PersonalFeed</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 max-w-xs">
              Your personalized content hub. Curated, organized, and designed
              for focus.
            </p>
            <div className="flex gap-3">
              {footerData.brand.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {["Product", "Company", "Legal"].map((section) => (
            <div key={section} className="col-span-1">
              <h4 className="text-white font-semibold mb-3 text-sm">
                {section}
              </h4>
              <ul className="space-y-2">
                {footerData.links[section.toLowerCase()].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>{footerData.copyright}</p>
          <div className="flex gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
