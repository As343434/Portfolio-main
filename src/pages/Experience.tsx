import React, { useEffect, useRef, useState, useTransition } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { Briefcase, Trophy, Award, Users, Sparkles, TrendingUp, BookOpen, Terminal, FileText } from 'lucide-react';

type BreakpointZone = 'college' | 'publicSpeaking' | 'dataScience' | 'internship' | 'softSkills';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);

  const TOTAL_FRAMES = 2400;
  const imageCacheRef = useRef<HTMLImageElement[]>([]);
  const [, startTransition] = useTransition();

  const BREAKPOINTS: Record<BreakpointZone, { start: number; end: number }> = {
    college: { start: 0, end: 479 },
    publicSpeaking: { start: 480, end: 959 },
    dataScience: { start: 960, end: 1439 },
    internship: { start: 1440, end: 1919 },
    softSkills: { start: 1920, end: 2399 }
  };

  // 1. IMPROVED ASSET LOADER (Parallelized)
useEffect(() => {
  let active = true;
  const cache: HTMLImageElement[] = new Array(TOTAL_FRAMES);
  
  const loadImages = async () => {
    // Helper to load a single image
    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(5, '0');
        img.src = `/assets/experience/frame_${paddedIndex}.webp`; // Use .webp
        img.onload = () => { cache[index] = img; resolve(); };
        img.onerror = resolve; // Continue even if one fails
      });
    };

    // Load in chunks to avoid overwhelming the browser network queue
    const CHUNK_SIZE = 20; 
    for (let i = 0; i < TOTAL_FRAMES; i += CHUNK_SIZE) {
      if (!active) return;
      const chunk = Array.from({ length: CHUNK_SIZE }, (_, j) => i + j)
                         .filter(idx => idx < TOTAL_FRAMES);
      
      await Promise.all(chunk.map(loadImage));
      setLoadingProgress(Math.round(((i + CHUNK_SIZE) / TOTAL_FRAMES) * 100));
    }
    
    imageCacheRef.current = cache;
    setIsLoading(false);
  };
  
  loadImages();
  return () => { active = false; };
}, []);

  // 2. GPU-OPTIMIZED RENDERER
  const draw = (index: number, velocity: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imageCacheRef.current[index];
    if (img?.complete) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (Math.abs(velocity) > 1.5) {
        ctx.fillStyle = 'rgba(79, 172, 254, 0.05)';
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
      }
    }
  };

  // 3. SCROLL ENGINE
  useEffect(() => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 0.99);
      const frame = Math.floor(progress * TOTAL_FRAMES);
      
      startTransition(() => setCurrentFrame(frame));
      requestAnimationFrame(() => draw(frame, 0));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const isActiveZone = (zone: BreakpointZone) => currentFrame >= BREAKPOINTS[zone].start && currentFrame <= BREAKPOINTS[zone].end;

  return (
    <PageTransition>
      <div ref={containerRef} className="relative w-full bg-[#050308] min-h-[750vh] antialiased">
        {/* CANVAS LAYER - FIXED */}
        <div className="fixed inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-[#050308] opacity-95" />
        </div>

        {/* LOADING SHIELD */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050308] text-white font-mono text-[10px] tracking-widest">
            <div className="w-64 border border-white/20 p-4">
              <div className="h-1 bg-white/10 w-full mb-2">
                <div className="h-full bg-cyan-400 transition-all duration-75" style={{ width: `${loadingProgress}%` }} />
              </div>
              SYS.SYNC: {loadingProgress}% LOADED
            </div>
          </div>
        )}

        {/* UI CONTENT... */}
        <div className="relative z-10 max-w-7xl mx-auto px-16 pt-40 pointer-events-none">
          <header className="h-[70vh] flex flex-col justify-center items-center text-white">
            <h1 className="text-6xl font-black uppercase tracking-tight">Experience Engine</h1>
          </header>
          
          <div className="space-y-[100vh]">
            <div className={`transition-all duration-700 ${isActiveZone('college') ? 'opacity-100' : 'opacity-0'}`}>
               <GlowCard className="p-8 bg-[#0D0D11]/90 pointer-events-auto">
                 <h2 className="text-4xl text-white font-black">K.R. Mangalam University</h2>
               </GlowCard>
            </div>
            {/* ... Rest of your Blocks */}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
