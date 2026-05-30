import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'left',
  className = ""
}: SectionHeadingProps) {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`flex flex-col mb-12 relative ${alignmentClass} ${className}`}>
      {badge && (
        <span className="font-mono text-[10px] text-electric-magenta uppercase tracking-widest bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3 py-1 rounded-full mb-3 shadow-[0_0_10px_rgba(59,130,246,0.1)] animate-pulse-slow">
          {badge}
        </span>
      )}
      
      <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-none mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="font-sans text-text-secondary max-w-2xl text-sm md:text-base font-normal tracking-wide leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Aesthetic color underline bar */}
      <div className={`mt-4 w-20 h-1 bg-gradient-to-r from-neon-cyan via-electric-magenta to-transparent rounded-full`} />
    </div>
  );
}
