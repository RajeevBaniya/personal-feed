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
      
      <div className={`relative ${bgColor} backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-white/20 text-center`}>
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 mx-auto`}>
          <div className="text-white">{icon}</div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}