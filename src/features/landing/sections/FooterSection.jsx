'use client';
import React from 'react';
import { footerData } from '@/data/footerData';

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 backdrop-blur-xl hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {footerData.brand.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {footerData.brand.description}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {footerData.brand.socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="sm:text-center md:text-left">
            <h4 className="text-white font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              {footerData.links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="sm:text-center md:text-left">
            <h4 className="text-white font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerData.links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="sm:text-center md:text-left">
            <h4 className="text-white font-semibold mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerData.links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}