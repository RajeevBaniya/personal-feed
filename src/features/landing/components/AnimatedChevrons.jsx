'use client';
import React from 'react';

export default function AnimatedChevrons() {
  return (
    <div className="flex items-center relative w-20 justify-center mx-1" aria-hidden="true">
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 blur-lg opacity-40" style={{ 
        background: 'linear-gradient(90deg, rgba(59,130,246,0.6), rgba(168,85,247,0.6), rgba(236,72,153,0.6))' 
      }} />
      
      {/* Flowing chevrons ">" */}
      <div className="relative flex gap-1.5 items-center">
        {[0, 0.15, 0.3, 0.45].map((delay, index) => (
          <span 
            key={index}
            className="text-2xl font-bold animate-chevron-flow" 
            style={{ 
              animationDelay: `${delay}s`,
              background: 'linear-gradient(90deg, rgb(59,130,246), rgb(168,85,247), rgb(236,72,153))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 1 - (index * 0.15)
            }}
          >
            {'›'}
          </span>
        ))}
      </div>
    </div>
  );
}