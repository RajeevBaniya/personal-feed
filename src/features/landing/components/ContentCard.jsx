'use client';
import React from 'react';

export default function ContentCard({ 
  icon, 
  title, 
  subtitle, 
  description, 
  gradientColors
}) {
  return (
    <div className="relative group">
      {/* Hover glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradientColors} opacity-0 group-hover:opacity-30 blur-xl transition duration-500 rounded-3xl`}></div>
      
      <div 
        className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl bg-gradient-to-br ${gradientColors} min-h-[300px]`}
        style={{
          background: gradientColors === 'from-purple-600 to-pink-600' 
            ? 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)'
            : gradientColors === 'from-emerald-500 to-teal-500'
            ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
            : undefined
        }}
      >
        {/* Full gradient background with content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="text-white transform transition-transform duration-300 group-hover:scale-110">
            {icon}
            <div className="text-2xl font-bold mt-4 mb-6">{title}</div>
          </div>
          
          <div className="mt-auto">
            <h3 className="text-xl font-bold text-white mb-3">{subtitle}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
