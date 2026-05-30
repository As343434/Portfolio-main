import React, { useRef, useState, useTransition } from 'react';
import { motion } from 'motion/react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'magenta' | 'cyan' | 'violet' | 'orange' | 'crimson';
  onClick?: () => void;
  id?: string;
  key?: React.Key;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = 'magenta',
  onClick,
  id
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [, startTransition] = useTransition();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top;  // y position within card
    
    // Normalize coordinates (-0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    // Tilt limit degrees
    const maxTilt = 8;
    startTransition(() => {
      setRotate({
        x: -normY * maxTilt,
        y: normX * maxTilt
      });
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startTransition(() => {
      setRotate({ x: 0, y: 0 });
    });
  };

  const glowShadows = {
    magenta: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:border-[#3B82F6]/40 border-white/5 bg-[#141414]',
    cyan: 'hover:shadow-[0_0_25px_rgba(96,165,250,0.25)] hover:border-[#60A5FA]/40 border-white/5 bg-[#141414]',
    violet: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-[#3B82F6]/30 border-white/5 bg-[#141414]',
    orange: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:border-[#3B82F6]/40 border-white/5 bg-[#141414]',
    crimson: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:border-[#EF4444]/40 border-white/5 bg-[#141414]'
  }[glowColor];

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}
      className={`glass-panel p-6 rounded-2xl cursor-pointer transition-all duration-300 ${glowShadows} ${className}`}
    >
      {/* Dynamic Back-Glow Orb on Cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-20 transition-opacity bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
      {children}
    </div>
  );
}
