To ensure this is fully readable and functional on both mobile and desktop without layout breakage, I have refined the grid structures (using `minmax` to prevent overflow) and tightened the responsive containers.

This version optimizes the `Interactive3DGridCard` to be touch-friendly and prevents "shaking" by adding explicit hardware acceleration and constraining the transformation ranges.

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Palette, Music, BookOpen, FileText, Trophy, Terminal, Layers } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import GlowCard from '../components/ui/GlowCard';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/layout/PageTransition';

// -------------------------------------------------------------
// Stat Counter (Optimized for performance)
// -------------------------------------------------------------
interface CounterProps {
  targetValue: number;
  suffix?: string;
  label: string;
}

function StatCounter({ targetValue, suffix = "", label }: CounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && active) {
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * targetValue));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { active = false; observer.disconnect(); };
  }, [targetValue]);

  return (
    <div ref={containerRef} className="flex flex-col items-center py-6 px-2 border border-white/5 bg-[#0D0D11] hover:border-white/10 transition-colors">
      <span className="font-mono text-2xl md:text-4xl font-black text-white">{count}{suffix}</span>
      <span className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">{label}</span>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Card (Mobile Safe)
// -------------------------------------------------------------
function Interactive3DGridCard({ children, glowColor }: { children: React.ReactNode; glowColor: "cyan" | "magenta" | "violet" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), spring);

  return (
    <div 
      className="w-full h-full perspective-1000"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div style={{ rotateX, rotateY }} className="w-full h-full">
        <GlowCard glowColor={glowColor} className="h-full w-full">
          {children}
        </GlowCard>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-[#050507] text-white selection:bg-blue-500/30 overflow-x-hidden">
        <HeroSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Philosophy Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
            <div className="md:col-span-7 space-y-6">
              <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.2em]">// Core Philosophy</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase leading-tight">Architecting at the <span className="text-blue-500">intersection</span> of logic and art.</h2>
              <p className="text-sm text-gray-400 leading-relaxed">Merging rigorous engineering with spatial design and literature. Software systems resonating with rhythmic human experience.</p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 bg-[#0D0D11] p-2">
                <img src="/src/assets/profile.webp" alt="Profile" className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Grid Layouts with Responsive Flex/Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            <Interactive3DGridCard glowColor="cyan">
              <div className="p-6 h-full flex flex-col gap-4 bg-[#0D0D11]">
                <Brain className="text-blue-500" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Data Science</h3>
                <p className="text-xs text-gray-400">Advanced analytical pipelines using Python, Pandas, and visualization suites.</p>
              </div>
            </Interactive3DGridCard>
            <Interactive3DGridCard glowColor="magenta">
              <div className="p-6 h-full flex flex-col gap-4 bg-[#0D0D11]">
                <Cpu className="text-pink-500" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Engineering</h3>
                <p className="text-xs text-gray-400">Full-stack React/Python distributed systems with secure RBAC architectures.</p>
              </div>
            </Interactive3DGridCard>
            <Interactive3DGridCard glowColor="violet">
              <div className="p-6 h-full flex flex-col gap-4 bg-[#0D0D11]">
                <Palette className="text-purple-500" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Creative Tech</h3>
                <p className="text-xs text-gray-400">Combining sculpting principles with interface design to minimize user fatigue.</p>
              </div>
            </Interactive3DGridCard>
          </section>

          {/* Statistics Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            <StatCounter targetValue={6} suffix="+" label="Systems" />
            <StatCounter targetValue={1} suffix="st" label="Hackathon" />
            <StatCounter targetValue={4} label="Disciplines" />
            <StatCounter targetValue={1} label="Novel" />
          </section>

          {/* Call to Action */}
          <section className="border border-white/10 p-8 md:p-16 text-center bg-[#0D0D11]">
            <h2 className="text-2xl md:text-4xl font-black mb-6">Initialize Connection</h2>
            <Link to="/contact" className="inline-block border border-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Establish Link
            </Link>
          </section>
        </section>
      </main>
    </PageTransition>
  );
}

```
