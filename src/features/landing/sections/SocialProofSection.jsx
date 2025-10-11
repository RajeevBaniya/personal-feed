'use client';
import React from 'react';

export default function SocialProofSection() {
  return (
    <div className="mb-20 lg:mb-24">
      <div className="relative">
        {/* Decorative gradient border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 blur"></div>
        
        <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
          
          <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-300 italic mb-6 leading-relaxed">
            "PersonalFeed transformed how can we consume content. Having everything in one customizable feed saves us hours every day"
          </blockquote>
        </div>
      </div>
    </div>
  );
}