'use client';
import React from 'react';

export default function Connector({ gradient = 'rgba(99,102,241,0.5), rgba(168,85,247,0.5)' }) {
  return (
    <div className="hidden lg:flex items-center absolute top-[58%] left-full translate-x-2 w-12 justify-center z-0 pointer-events-none" aria-hidden="true">
      {/* Glow effect */}
      <div className="absolute inset-0 blur-lg opacity-30" style={{ 
        background: `linear-gradient(90deg, ${gradient})` 
      }} />
      
      {/* Flowing dashes */}
      <div className="relative flex gap-1.5 items-center">
        {[0, 0.15, 0.3, 0.45].map((delay, index) => (
          <span 
            key={index}
            className="text-xl font-bold animate-chevron-flow" 
            style={{ 
              animationDelay: `${delay}s`,
              background: `linear-gradient(90deg, ${gradient})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 1 - (index * 0.2)
            }}
          >
            {'—'}
          </span>
        ))}
      </div>
    </div>
  );
}
