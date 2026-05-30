import React, { useEffect, useRef, useState, useTransition } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { 
  Briefcase, 
  Trophy, 
  Award, 
  Users, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Terminal, 
  FileText 
} from 'lucide-react';

type BreakpointZone = 'college' | 'publicSpeaking' | 'dataScience' | 'internship' | 'softSkills';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);

  const TOTAL_FRAMES = 2400;
  const lastScrollTime = useRef<number>(Date.now());
  const lastScrollTop = useRef<number>(0);
  const imageCacheRef = useRef<HTMLImageElement[]>([]);
  const [, startTransition] = useTransition();
  
  const BREAKPOINTS: Record<BreakpointZone, { start: number; end: number }> = {
    college: { start: 0, end: 479 },
    publicSpeaking: { start: 480, end: 959 },
    dataScience: { start: 960, end: 1439 },
    internship: { start: 1440, end: 1919 },
    softSkills: { start: 1920, end: 2399 }
  };

  // 1. Preload and lock lifecycle until all 2400 frames are inside local memory
  useEffect(() => {
    let active = true;

    // Grab all frames using Vite's compile-time bundle layout resolver
    const frameModules = import.meta.glob('/src/assets/experience/frame_*.jpg', { eager: true });

    const loadSequencer = async () => {
      const temporaryCache: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!active) return;

        const paddedIndex = String(i).padStart(5, '0');
        const mapKey = `/src/assets/experience/frame_${paddedIndex}.jpg`;
        const module = frameModules[mapKey] as { default: string } | undefined;

        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          const overallProgress = Math.min(Math.round((loadedCount / TOTAL_FRAMES) * 100), 100);
          setLoadingProgress(overallProgress);

          if (loadedCount === TOTAL_FRAMES && active) {
            setIsLoading(false);
            // Fire target baseline initial draw
            drawFrameToCanvas(0, 0);
          }
        };

        img.onerror = () => {
          loadedCount++;
          const overallProgress = Math.min(Math.round((loadedCount / TOTAL_FRAMES) * 100), 100);
          setLoadingProgress(overallProgress);
          
          if (loadedCount === TOTAL_FRAMES && active) {
            setIsLoading(false);
          }
        };

        // Match resolution to production bundled hashed assets or native fallback paths
        img.src = module ? module.default : `/src/assets/experience/frame_${paddedIndex}.jpg`;
        temporaryCache.push(img);
      }

      if (active) {
        imageCacheRef.current = temporaryCache;
      }
    };

    loadSequencer();

    return () => {
      active = false;
    };
  }, []);

  // 2. High-performance direct renderer function
  const drawFrameToCanvas = (frameIndex: number, currentVelocity: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = imageCacheRef.current[frameIndex];
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Kinetic glitch filter effect during high velocity scrub metrics
      if (Math.abs(currentVelocity) > 1.5) {
        context.fillStyle = 'rgba(79, 172, 254, 0.03)';
        for (let y = 0; y < canvas.height; y += 8) {
          context.fillRect(0, y, canvas.width, 2);
        }
      }
    }
  };

  // 3. Scroll monitoring state synchronization
  useEffect(() => {
    // Prevent tracking scroll events during loading phase
    if (isLoading) return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const now = Date.now();
      const scrollTop = window.scrollY;
      const timeDelta = Math.max(now - lastScrollTime.current, 1);
      const scrollDelta = scrollTop - lastScrollTop.current;
      const velocity = scrollDelta / timeDelta;
      
      setScrollVelocity(velocity);
      
      lastScrollTime.current = now;
      lastScrollTop.current = scrollTop;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      const scrollProgress = totalScrollableHeight > 0 
        ? Math.min(Math.max(-rect.top / totalScrollableHeight, 0), 0.999)
        : 0;
      
      const frameIndex = Math.floor(scrollProgress * TOTAL_FRAMES);
      
      startTransition(() => {
        setCurrentFrame(frameIndex);
      });
      
      requestAnimationFrame(() => drawFrameToCanvas(frameIndex, velocity));
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      // Force refresh look
      drawFrameToCanvas(currentFrame, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial paint loop trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading]);

  const isActiveZone = (zone: BreakpointZone): boolean => {
    return currentFrame >= BREAKPOINTS[zone].start && currentFrame <= BREAKPOINTS[zone].end;
  };

  return (
    <PageTransition>
      <div ref={containerRef} className="relative w-full bg-[#050308] min-h-[750vh] antialiased selection:bg-[#4FACFE]/30">
        
        {/* HIGH-PERFORMANCE VIDEO ENGINE CANVAS LAYER */}
        <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden flex items-center justify-center bg-[#050308]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover opacity-45 mix-blend-screen transition-transform duration-200 pointer-events-none scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-[#050308] opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050308] via-transparent to-[#050308] opacity-90" />
        </div>

        {/* LOADING SHIELD OVERLAY - Full page intercept lock */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050308]">
            <div className="text-center space-y-6 max-w-sm px-6">
              <div className="relative h-[2px] w-64 bg-white/5 overflow-hidden mx-auto">
                <div 
                  className="h-full bg-gradient-to-r from-[#4FACFE] via-[#00F2FE] to-[#C850C0] transition-all duration-300 shadow-[0_0_8px_#4FACFE]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-400 animate-pulse">
                SYS.INIT // STREAMING_TIMELINE_NODES ({loadingProgress}%)
              </p>
              <p className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">
                Pre-Caching Sequential Frame Array 0000 - 2399
              </p>
            </div>
          </div>
        )}

        {/* FLOATING TELEMETRY COUNTER */}
        {!isLoading && (
          <div className="fixed top-8 right-8 z-40 font-mono text-[9px] bg-[#0D0D11]/80 backdrop-blur-md border border-white/5 px-4 py-2 text-gray-400 flex flex-col gap-1 items-end rounded-none tracking-widest">
            <div className="flex items-center gap-2">
              <span className={`h-1 w-1 rounded-full ${Math.abs(scrollVelocity) > 0.5 ? 'bg-amber-400 animate-ping' : 'bg-[#00F2FE]'}`} />
              <span>FRAME {String(currentFrame).padStart(4, '0')} // 2399</span>
            </div>
            <span className="text-[7px] text-gray-600">VELOCITY_DELTA: {scrollVelocity.toFixed(2)}px/ms</span>
          </div>
        )}

        {/* FOREGROUND INTERFACE */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-48 pointer-events-none">
          
          <header className="mb-48 text-center h-[70vh] flex flex-col justify-center items-center relative z-20">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4FACFE] block mb-4 font-bold">
              // CHRONOLOGICAL MATRIX
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              Experience Engine
            </h1>
            <p className="text-xs text-gray-500 font-mono tracking-wide uppercase max-w-md">
              Scroll to scrub through structural milestones and governance vectors
            </p>
            <div className="mt-16 animate-bounce font-mono text-[8px] uppercase tracking-[0.3em] text-[#4FACFE] bg-white/5 border border-white/5 px-4 py-2">
              SCROLL DOWN // SCRUB VIDEO
            </div>
          </header>

          <div className="space-y-[100vh] relative z-20">

            {/* BLOCK 1: ACADEMIC FOUNDATIONS */}
            <div className={`transition-all duration-700 ease-out pointer-events-auto ${isActiveZone('college') ? 'opacity-100 transform translate-x-0' : 'opacity-10 transform -translate-x-8 scale-95'}`}>
              <div className="max-w-xl">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#4FACFE] uppercase bg-[#4FACFE]/5 px-3 py-1 border border-[#4FACFE]/10">
                  BLOCK_01 // FRAMES 0000 – 0479
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-4 mb-6 tracking-tight">
                  K.R. Mangalam University <br />
                  <span className="font-mono font-light text-xl text-gray-500 lowercase block mt-1">b.tech cse (data science)</span>
                </h2>
                
                <GlowCard id="exp-card-1" glowColor="cyan" className="p-6 md:p-8 bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl rounded-none">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Academic Track & Specialization</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Runtime Environment: 2023 — 2027</p>
                    </div>
                    <BookOpen className="text-[#4FACFE] h-4 w-4 shrink-0" />
                  </div>
                  <ul className="space-y-3 font-sans text-xs text-gray-400 font-light leading-relaxed">
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Serving continuously as the appointed <strong>Class Representative (CR)</strong> since Day 1 of Semester 1.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Maintaining rigorous academic benchmarks while pursuing deep-domain specialization in Data Science architectures.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Secured official <strong>IBM Data Science Specialization Certificates</strong> validating proficiency across industrial data schemas and model optimization.</li>
                  </ul>
                </GlowCard>
              </div>
            </div>

            {/* BLOCK 2: PUBLIC SPEAKING & LEADERSHIP */}
            <div className={`transition-all duration-700 ease-out pointer-events-auto flex justify-end ${isActiveZone('publicSpeaking') ? 'opacity-100 transform translate-x-0' : 'opacity-10 transform translate-x-8 scale-95'}`}>
              <div className="max-w-xl text-right flex flex-col items-end">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#C850C0] uppercase bg-[#C850C0]/5 px-3 py-1 border border-[#C850C0]/10">
                  BLOCK_02 // FRAMES 0480 – 0959
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-4 mb-6 tracking-tight">
                  Public Speaking & <br />
                  <span className="font-mono font-light text-xl text-gray-500 lowercase block mt-1">campus governance coordination</span>
                </h2>

                <GlowCard id="exp-card-2" glowColor="magenta" className="p-6 md:p-8 bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl text-left rounded-none">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <Users className="text-[#C850C0] h-4 w-4 shrink-0" />
                    <div className="text-right">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Event Command & Orientation</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Institutional Integration Network</p>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed mb-6">
                    Steered the crowd mechanics and deployment logic for major university orientation milestones. Spearheaded organizational frameworks as an event coordinator, commanding stage assemblies and presenting technical tracks to large student demographics.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {['Orientation Mentor', 'Event Lead', 'Strategic Communication', 'Public Relations'].map((tag) => (
                      <span key={tag} className="font-mono text-[8px] px-2.5 py-1 bg-white/5 border border-white/5 text-gray-400 uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </div>
            </div>

            {/* BLOCK 3: DATA SCIENCE EXPERTISE */}
            <div className={`transition-all duration-700 ease-out pointer-events-auto ${isActiveZone('dataScience') ? 'opacity-100 transform translate-x-0' : 'opacity-10 transform -translate-x-8 scale-95'}`}>
              <div className="max-w-xl">
                <span className="font-mono text-[9px] tracking-[0.2em] text-gray-400 uppercase bg-white/5 px-3 py-1 border border-white/10">
                  BLOCK_03 // FRAMES 0960 – 1439
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-4 mb-6 tracking-tight">
                  Data Science Lab <br />
                  <span className="font-mono font-light text-xl text-gray-500 lowercase block mt-1">toolchains & analytical pipelines</span>
                </h2>

                <GlowCard id="exp-card-3" glowColor="violet" className="p-6 md:p-8 bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl rounded-none">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Statistical Engine Pipeline</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">IBM Watson & Python Ecosystems</p>
                    </div>
                    <Terminal className="text-gray-400 h-4 w-4 shrink-0" />
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed mb-6">
                    Deep dive research modules executing calculations across advanced toolkits. Engineering interactive dashboards and standalone statistical visualizers to unpack structural raw telemetry.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 font-mono text-[9px] text-white uppercase tracking-wider">
                    <div className="p-3 bg-white/5 border border-white/5">
                      <span className="text-[#4FACFE] block font-bold mb-1">// BI & TABULATION</span>
                      Tableau, Power BI, Advanced Excel
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5">
                      <span className="text-[#C850C0] block font-bold mb-1">// ENVIRONMENTS</span>
                      Jupyter Lab, IBM Watson Studio
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-dashed border-white/10 font-mono text-[9px] text-gray-400 tracking-wide uppercase">
                    🚀 Currently building custom web-native Python data tools.
                  </div>
                </GlowCard>
              </div>
            </div>

            {/* BLOCK 4: INTERNSHIP & CAREER CORE */}
            <div className={`transition-all duration-700 ease-out pointer-events-auto flex justify-end ${isActiveZone('internship') ? 'opacity-100 transform translate-x-0' : 'opacity-10 transform translate-x-8 scale-95'}`}>
              <div className="max-w-xl text-right flex flex-col items-end">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#4FACFE] uppercase bg-[#4FACFE]/5 px-3 py-1 border border-[#4FACFE]/10">
                  BLOCK_04 // FRAMES 1440 – 1919
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-4 mb-6 tracking-tight">
                  IT Cell Engineering <br />
                  <span className="font-mono font-light text-xl text-gray-500 lowercase block mt-1">production terms & professional internships</span>
                </h2>

                <GlowCard id="exp-card-4" glowColor="cyan" className="p-6 md:p-8 bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl text-left rounded-none">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <Briefcase className="text-[#4FACFE] h-4 w-4 shrink-0" />
                    <div className="text-right">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">IT Cell Integration Intern</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Summer Term Production Milestone</p>
                    </div>
                  </div>
                  <ul className="space-y-3 font-sans text-xs text-gray-400 font-light leading-relaxed">
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Assembled production data loops linking proprietary operational schemas straight into responsive, high-performance dashboards.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Designed visualization scripts allowing deans to run fast coordinate checking evaluations.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#4FACFE] font-mono select-none">▪</span> Compiled and polished full-stack technical CV portfolios highlighting optimized deployment layers.</li>
                  </ul>
                </GlowCard>
              </div>
            </div>

            {/* BLOCK 5: SOFT SKILLS & STARTUP DISCOVERY */}
            <div className={`transition-all duration-700 ease-out pointer-events-auto ${isActiveZone('softSkills') ? 'opacity-100 transform translate-x-0' : 'opacity-10 transform -translate-x-8 scale-95'}`}>
              <div className="max-w-xl">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#C850C0] uppercase bg-[#C850C0]/5 px-3 py-1 border border-[#C850C0]/10">
                  BLOCK_05 // FRAMES 1920 – 2399
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-4 mb-6 tracking-tight">
                  Tactile Strategy & <br />
                  <span className="font-mono font-light text-xl text-gray-500 lowercase block mt-1">entrepreneurial frameworks</span>
                </h2>

                <GlowCard id="exp-card-5" glowColor="magenta" className="p-6 md:p-8 bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl rounded-none">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Market Archetype Explorations</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Knowledge Expansion Vectors</p>
                    </div>
                    <Sparkles className="text-[#C850C0] h-4 w-4 shrink-0" />
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed mb-6">
                    Executed rapid strategic pilot tests to unpack local consumer demand loops, manufacturing logistics, and high-end visual systems. Blending hard technical data analytics with fluid, tactical business execution models.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-[8px] text-white uppercase tracking-wider">
                    <div className="p-3 bg-white/5 border border-white/5">
                      <TrendingUp className="h-3 w-3 mx-auto mb-2 text-[#4FACFE]" />
                      Confidence
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5">
                      <Award className="h-3 w-3 mx-auto mb-2 text-[#C850C0]" />
                      Diplomacy
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5">
                      <Trophy className="h-3 w-3 mx-auto mb-2 text-gray-400" />
                      Architecture
                    </div>
                  </div>
                </GlowCard>
              </div>
            </div>

          </div>

          {/* SUMMARY MATRIX HERO CARD */}
          <section className="mt-60 border border-white/5 p-8 md:p-16 bg-[#0D0D11]/60 backdrop-blur-xl text-center max-w-4xl mx-auto pointer-events-auto rounded-none relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <FileText className="h-6 w-6 text-[#4FACFE]" />
              <h3 className="font-sans font-black text-xl text-white uppercase tracking-wider">
                Timeline Sync Status // Complete
              </h3>
              <p className="font-sans text-xs text-gray-400 font-light leading-relaxed max-w-xl">
                This dynamic deployment maps technical analytical execution cleanly alongside leadership architectures—structuring real-world systemic coordination with product intuition.
              </p>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
