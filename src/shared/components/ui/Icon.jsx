'use client';
import React, { useEffect, useRef, useState } from 'react';
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};
const inlineCache = { current: null };
async function loadInlineIconMap() {
  if (inlineCache.current) return inlineCache.current;
  try {
    const res = await fetch('/icons/inline.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('inline icons fetch failed');
    const json = await res.json();
    inlineCache.current = json;
    return json;
  } catch {
    inlineCache.current = {};
    return {};
  }
}

export default function Icon({ name, className = '', size = 'md', fill = 'none', stroke = 'current' }) {
  const [icons, setIcons] = useState(null);
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    loadInlineIconMap().then(setIcons);
  }, []);

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const fillClass = fill === 'current' ? 'fill-current' : 'fill-none';
  const strokeClass = stroke === 'current' ? 'stroke-current' : 'stroke-none';

  const pathHtml = icons && icons[name];
  if (pathHtml) {
    return (
      <svg
        className={`${sizeClass} ${fillClass} ${strokeClass} ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g dangerouslySetInnerHTML={{ __html: pathHtml }} />
      </svg>
    );
  }

  return (
    <img
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      className={`${sizeClass} ${fillClass} ${strokeClass} ${className}`}
      style={{ filter: 'none', WebkitFilter: 'none' }}
    />
  );
}
