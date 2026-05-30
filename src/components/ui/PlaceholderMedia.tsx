import React, { useState } from 'react';
import { Eye, Image as ImageIcon, Video, Music, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PlaceholderMediaProps {
  path: string;
  title?: string;
  type?: 'image' | 'video' | 'audio';
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  className?: string;
}

export default function PlaceholderMedia({
  path,
  title = "Media Resource",
  type = 'image',
  aspectRatio = 'video',
  className = ""
}: PlaceholderMediaProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: 'h-full w-full'
  }[aspectRatio];

  // Since actual assets in /public may not exist yet, we will fallback beautifully
  // with premium mock gradients that match Sarthak's design specs!
  const getGradient = () => {
    switch (type) {
      case 'video':
        return 'from-[#141414] via-[#262626] to-[#3B82F6]';
      case 'audio':
        return 'from-[#0A0A0A] via-[#141414] to-[#60A5FA]';
      default:
        return 'from-[#141414] via-[#0A0A0A] to-[#262626]';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/5 bg-[#141414] ${aspectClass} ${className} group`}>
      {/* If file exists & loadable */}
      {!hasError && type === 'image' && (
        <img
          src={path}
          alt={title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}

      {/* Styled premium placeholder fallback when image fails loading or is not uploaded */}
      {(hasError || !isLoaded || type !== 'image') && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-tr ${getGradient()} opacity-90 transition-opacity duration-500`}>
          {/* Neon Grid overlay for high-tech aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,10,10,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.3)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-40"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
            {/* Animated Glow Halo */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-deep/60 text-neon-cyan border border-neon-cyan/40 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-300">
              {type === 'video' ? (
                <Video className="h-6 w-6 text-electric-magenta animate-pulse" />
              ) : type === 'audio' ? (
                <Music className="h-6 w-6 text-neon-cyan" />
              ) : (
                <ImageIcon className="h-6 w-6 text-text-secondary" />
              )}
            </div>

            <span className="font-display font-medium text-text-primary tracking-wide text-sm mb-1">
              {title}
            </span>
            <p className="font-mono text-[10px] text-text-secondary mb-3 bg-primary-deep/50 px-2 py-1 rounded border border-white/5 select-all break-all">
              {path}
            </p>
            
            <div className="flex items-center gap-1.5 font-sans text-[10px] text-neon-cyan/85 bg-neon-cyan/10 px-2 py-0.5 rounded-full border border-neon-cyan/20">
              <Sparkles className="h-3 w-3" />
              <span>Placeholder ready • Click to select</span>
            </div>
          </div>
        </div>
      )}

      {/* Hover action overlay sheet */}
      <div className="absolute inset-0 bg-primary-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-sm z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <span className="text-xs font-mono bg-[#141414] border border-electric-magenta/30 text-text-primary px-3 py-1.5 rounded-full flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-electric-magenta" />
              Inspect Path
            </span>
          </div>
          <span className="text-[10px] text-text-secondary text-center px-4 font-mono">
            Place your asset directly in the file manager at this file path.
          </span>
        </div>
      </div>
    </div>
  );
}
