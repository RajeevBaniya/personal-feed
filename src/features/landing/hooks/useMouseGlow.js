import { useState } from 'react';

export default function useMouseGlow() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const glowStyle = {
    background: `radial-gradient(300px 300px at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.12), transparent 60%)`,
  };

  return { mousePos, handleMouseMove, glowStyle };
}
