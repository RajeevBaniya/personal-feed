'use client';
import React from 'react';

export default function FeatureCard({ icon, title, description, gradient, bgColor }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-2xl" style={{
        background: `linear-gradient(to right, var(--tw-gradient-stops))`,
        '--tw-gradient-from': gradient.split(' ')[1],
        '--tw-gradient-to': gradient.split(' ')[3]
      }}></div>
      
      <div 
        className={`relative backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-white/20 text-center`}
        style={{
          backgroundColor: bgColor === 'bg-blue-950/40' 
            ? 'rgba(30, 58, 138, 0.4)'
            : bgColor === 'bg-purple-950/40'
            ? 'rgba(88, 28, 135, 0.4)'
            : bgColor === 'bg-emerald-950/40'
            ? 'rgba(6, 78, 59, 0.4)'
            : bgColor === 'bg-pink-950/40'
            ? 'rgba(131, 24, 67, 0.4)'
            : undefined
        }}
      >
        <div className="inline-flex p-3 rounded-xl border border-white/20 mb-4 mx-auto">
          <div className="text-white">{icon}</div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}