import React, { useRef } from 'react';
import { journeyMilestones } from '../data/journey';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Sparkles, Calendar, Award, Compass, Users, Briefcase, Star, Lightbulb } from 'lucide-react';

// -------------------------------------------------------------
// Interactive 3D Tilt Wrapper Element
// -------------------------------------------------------------
function Tilt3DCard({ children, isEven, glowColor }: { children: React.ReactNode; isEven: boolean; glowColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to record exact cursor positions relative to container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to dampen sudden movements and create fluid physics
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  
  // Creates depth translation for items wrapped inside the card
  const translateZ = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Absolute normalization coordinate calculations (-0.5 to 0.5 range)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      style={{ perspective: 1000 }} 
      className="w-full project-3d-container select-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, x: isEven ? 60 : -60, rotateZ: isEven ? 2 : -2 }}
        whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        whileHover={{ scale: 1.03, z: 20 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full origin-center cursor-pointer will-change-transform"
      >
        <GlowCard
          glowColor={glowColor}
          className="relative transition-all duration-300 preserve-3d overflow-visible group backdrop-blur-md bg-opacity-40"
        >
          {/* Depth layered children container */}
          <motion.div style={{ translateZ }} className="w-full h-full preserve-3d">
            {children}
          </motion.div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

// -------------------------------------------------------------
// Core Component Execution Pipeline
// -------------------------------------------------------------
export default function Journey() {
  const getDotColors = (type: string) => {
    switch (type) {
      case 'education':
        return 'text-[#4FACFE] bg-[#4FACFE]/20 border-[#4FACFE]/50 shadow-[0_0_15px_rgba(79,172,254,0.6)]';
      case 'award':
        return 'text-[#D4600A] bg-[#D4600A]/20 border-[#D4600A]/50 shadow-[0_0_15px_rgba(212,96,10,0.6)]';
      case 'creative':
        return 'text-[#C850C0] bg-[#C850C0]/20 border-[#C850C0]/50 shadow-[0_0_15px_rgba(200,80,192,0.6)]';
      case 'work':
        return 'text-[#22C55E] bg-[#22C55E]/20 border-[#22C55E]/50 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
      case 'leadership':
        return 'text-[#6B3FA0] bg-[#6B3FA0]/20 border-[#6B3FA0]/50 shadow-[0_0_15px_rgba(107,63,160,0.6)]';
      case 'current':
        return 'text-[#C850C0] bg-[#C850C0]/20 border-[#C850C0]/60 shadow-[0_0_25px_#C850C0] animate-pulse';
      default:
        return 'text-[#B8A8D0] bg-[#B8A8D0]/20 border-[#B8A8D0]/40 shadow-[0_0_10px_#B8A8D0]';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return <Compass className="h-4 w-4" />;
      case 'award':     return <Award className="h-4 w-4" />;
      case 'creative':  return <Sparkles className="h-4 w-4" />;
      case 'work':      return <Briefcase className="h-4 w-4" />;
      case 'leadership': return <Users className="h-4 w-4" />;
      case 'current':   return <Lightbulb className="h-4 w-4" />;
      default:          return <Star className="h-4 w-4" />;
    }
  };

  const getGlowColorString = (type: string): "cyan" | "orange" | "magenta" | "purple" | "green" => {
    if (type === 'award') return 'orange';
    if (type === 'education') return 'cyan';
    if (type === 'work') return 'green';
    if (type === 'leadership') return 'purple';
    return 'magenta';
  };

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-28 pb-20 bg-[#0B0416] text-white overflow-hidden">
        
        {/* Dynamic Generative Ambient Light Blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C850C0]/10 blur-[150px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#4FACFE]/10 blur-[180px] pointer-events-none animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#6B3FA0]/5 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <header className="mb-24 text-center">
            <SectionHeading
              title="The Chronological Orbit"
              subtitle="The engineering timeline and evolutionary milestones of a multidisciplinary builder."
              badge="Evolution Track"
              align="center"
            />
          </header>

          {/* CHRONO MATRIX TIMELINE CONTAINER */}
          <div className="relative mt-12 max-w-5xl mx-auto px-2">
            
            {/* Structural Center Line Axis */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C850C0] via-[#6B3FA0] to-[#4FACFE] rounded-full -translate-x-1/2 opacity-40 shadow-[0_0_15px_rgba(107,63,160,0.3)]" />

            {/* Iterative Render Sequence */}
            <div className="space-y-16">
              {journeyMilestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                const glowColor = getGlowColorString(milestone.type);

                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row relative items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Glowing Center-Node Coordinate Marker */}
                    <div className="absolute left-6 md:left-1/2 h-12 w-12 rounded-full border border-purple-500/30 -translate-x-1/2 bg-[#0B0416] flex items-center justify-center z-30 transition-transform duration-300 hover:scale-125">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300 ${getDotColors(milestone.type)}`}>
                        {getIcon(milestone.type)}
                      </div>
                    </div>

                    {/* Timeline Interactive Card Slot */}
                    <div className={`w-full md:w-[46%] pl-14 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                      <Tilt3DCard isEven={isEven} glowColor={glowColor}>
                        
                        {/* High-Contrast Floating Year Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono font-bold text-[#4FACFE] group-hover:text-[#C850C0] border border-[#4FACFE]/20 group-hover:border-[#C850C0]/40 px-3 py-1 rounded-full bg-[#0B0416]/80 transition-all duration-300 shadow-sm shadow-black/50 translate-z-20">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{milestone.year}</span>
                        </div>

                        {/* Top Meta Category Specifier */}
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B8A8D0]/80 mb-2.5 block translate-z-10">
                          System Core // {milestone.type}
                        </span>
                        
                        {/* Title String */}
                        <h3 className="font-syne font-extrabold text-lg md:text-xl text-white pr-20 leading-tight mb-3 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#4FACFE] transition-all duration-300 translate-z-15">
                          {milestone.title}
                        </h3>

                        {/* Description Blocks */}
                        <p className="font-sans text-sm text-[#B8A8D0] leading-relaxed font-light group-hover:text-white/90 transition-colors duration-300 translate-z-10">
                          {milestone.description}
                        </p>
                        
                      </Tilt3DCard>
                    </div>

                    {/* Desktop Counterweight Spacer Block */}
                    <div className="hidden md:block w-[46%]" />
                  </div>
                );
              })}
            </div>

          </div>

          {/* Dynamic Interactive Color Key Map Legend */}
          <div className="mt-24 max-w-2xl mx-auto p-6 rounded-2xl bg-[#140C24]/60 border border-[#6B3FA0]/20 backdrop-blur-md flex flex-wrap gap-x-6 gap-y-4 items-center justify-center relative z-20 shadow-xl shadow-black/40">
            <div className="w-full text-center mb-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B8A8D0] bg-[#0B0416] px-4 py-1.5 rounded-full border border-white/5">
                Chrono-System Matrix Key
              </span>
            </div>
            {[
              { label: 'Academic Core', color: 'bg-[#4FACFE] shadow-[0_0_8px_#4FACFE]' },
              { label: 'Elite Benchmarks', color: 'bg-[#D4600A] shadow-[0_0_8px_#D4600A]' },
              { label: 'Industry Systems', color: 'bg-[#22C55E] shadow-[0_0_8px_#22C55E]' },
              { label: 'Governance & Ops', color: 'bg-[#6B3FA0] shadow-[0_0_8px_#6B3FA0]' },
              { label: 'Tactile & Fine Arts', color: 'bg-[#C850C0] shadow-[0_0_8px_#C850C0]' }
            ].map((leg) => (
              <div key={leg.label} className="flex items-center gap-2 group cursor-crosshair">
                <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-150 ${leg.color}`} />
                <span className="font-sans text-xs text-[#B8A8D0] group-hover:text-white transition-colors duration-200">{leg.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}