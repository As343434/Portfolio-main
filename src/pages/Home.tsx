import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Palette, Music, BookOpen, FileText, Trophy, Terminal, Layers } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import GlowCard from '../components/ui/GlowCard';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/layout/PageTransition';

// -------------------------------------------------------------
// Frame-Rate Independent Stat Counter Component
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
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && active) {
          const startTime = performance.now();
          const duration = 1600; // 1.6 seconds for an elegant, readable ease

          const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Cubic Easing Out function for readable text braking near the target value
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOutCubic * targetValue);

            if (active) {
              setCount(currentValue);
              if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCount);
              } else {
                setCount(targetValue);
              }
            }
          };

          animationFrameId = requestAnimationFrame(updateCount);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      active = false;
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue]);

  return (
    <div ref={containerRef} className="flex flex-col items-center p-8 bg-[#0D0D11] border border-white/5 rounded-none backdrop-blur-sm relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
      <span className="font-mono font-black text-4xl sm:text-5xl text-white tracking-tighter relative z-10">
        {count}{suffix}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase mt-2 relative z-10 transition-colors duration-300 group-hover:text-[#3B82F6]">
        // {label}
      </span>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive 3D Glitch-Tilt Card Wrapper Module
// -------------------------------------------------------------
function Interactive3DGridCard({ children, glowColor }: { children: React.ReactNode; glowColor: "cyan" | "magenta" | "violet" }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  const skewX = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), springConfig);
  const translateZ = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full select-none" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, skewX }}
        className="w-full origin-center will-change-transform h-full"
      >
        <GlowCard id={`interactive-node-${Math.random()}`} glowColor={glowColor} className="h-full relative overflow-visible backdrop-blur-md preserve-3d">
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
export default function Home() {
  return (
    <PageTransition>
      <div className="relative w-full z-10 bg-[#050507] text-white selection:bg-[#3B82F6]/30 antialiased font-sans">
        
        {/* HERO SYSTEM INTEGRATION */}
        <HeroSection />

        <div id="featured-sections-teaser" className="py-20 relative overflow-hidden">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/25 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            {/* ABOUT PHILOSOPHY MODULE */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#3B82F6] font-bold">
                  // Core Philosophy & Statement
                </span>
                <blockquote className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                  "I don't just write code — I <span className="text-[#3B82F6] underline decoration-white/15 underline-offset-4">architect experiences</span> at the strict intersection of absolute logic and physical spatial art."
                </blockquote>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-xl">
                  Merging rigorous engineering and statistical data analysis with fine art sculpture protocols, indie-folk compositions, and published long-form literature. Computing arrays map directly onto the volumetric spatial fields we sculpt, and software systems resonate seamlessly with the rhythmic loops we sing.
                </p>
                <div>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors"
                  >
                    <span>Initialize Context Bio</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 border border-white/5 bg-[#0D0D11] p-3 rounded-full group transition-transform duration-500 hover:scale-105">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#3B82F6]/20 to-[#60A5FA]/10 rounded-full blur-xl opacity-75 pointer-events-none group-hover:opacity-100 transition-opacity" />
                  <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#050507] flex items-center justify-center relative">
                    <img
                      src="/src/assets/profile.webp"
                      alt="Sarthak Principal Portrait"
                      className="w-full h-full object-cover scale-105 opacity-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallbackNode = parent.querySelector('.fallback-node');
                          if (fallbackNode) fallbackNode.classList.remove('hidden');
                        }
                      }}
                    />
                    <div className="fallback-node hidden flex-col items-center text-gray-600 font-mono text-[9px]">
                      <Layers className="h-5 w-5 text-[#3B82F6] mb-1 animate-pulse" />
                      <span>IMAGE_RESOLVING</span>
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase mt-3">
                  SRCDIR_PTR // /src/assets/profile.webp
                </span>
              </div>
            </section>

            {/* EXPERTISE GRID SYSTEMS */}
            <section id="expertise" className="mb-32">
              <div className="mb-12">
                <SectionHeading
                  title="Core Disciplines"
                  subtitle="Technical and creative development workflows driving robust application spaces."
                  badge="Knowledge Domain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <Interactive3DGridCard glowColor="cyan">
                  <div className="flex flex-col gap-4 bg-[#0D0D11] border border-white/5 rounded-none p-6 h-full justify-between">
                    <div>
                      <div className="h-10 w-10 bg-[#3B82F6]/5 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] mb-2">
                        <Brain className="h-5 w-5" />
                      </div>
                      <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">
                        Data Science & Analytics
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-4">
                        Advanced exploratory pipelines, metric analysis, and graphical visualization setups built via NumPy, Pandas, Plotly, and Seaborn. Interactive dashboards deployed inside enterprise ecosystems.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {['Tableau', 'Power BI', 'EDA Python', 'IBM Watson'].map((skill) => (
                        <span key={skill} className="font-mono text-[8px] px-2 py-0.5 bg-[#050507] text-[#3B82F6] border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Interactive3DGridCard>

                <Interactive3DGridCard glowColor="magenta">
                  <div className="flex flex-col gap-4 bg-[#0D0D11] border border-white/5 rounded-none p-6 h-full justify-between">
                    <div>
                      <div className="h-10 w-10 bg-[#C850C0]/5 border border-[#C850C0]/20 flex items-center justify-center text-[#C850C0]/90 mb-2">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">
                        Full-Stack Engineering
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-4">
                        Compiling secure distributed systems. Client experiences managed using React and Vite, supported by Python automated backend pipelines, secure Firebase rules, and custom role-based auth routing structures.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {['React.js', 'Python API', 'Firebase Engine', 'RBAC'].map((skill) => (
                        <span key={skill} className="font-mono text-[8px] px-2 py-0.5 bg-[#050507] text-[#C850C0] border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Interactive3DGridCard>

                <Interactive3DGridCard glowColor="violet">
                  <div className="flex flex-col gap-4 bg-[#0D0D11] border border-white/5 rounded-none p-6 h-full justify-between">
                    <div>
                      <div className="h-10 w-10 bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-2">
                        <Palette className="h-5 w-5" />
                      </div>
                      <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">
                        Creative Tech & Fine Arts
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-4">
                        Applying structural balance from state-level fine sculptures and traditional vocal rhythms onto interface layout composition frameworks to build modern, anti-fatigue user experiences.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {['Sculpting', 'Layout Depth', 'Vocal Rhythm', 'Lyrics Scripting'].map((skill) => (
                        <span key={skill} className="font-mono text-[8px] px-2 py-0.5 bg-[#050507] text-gray-400 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Interactive3DGridCard>

              </div>
            </section>

            {/* CHRONOLOGICAL RUNTIME TEASER */}
            <section className="mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <SectionHeading
                  title="Tracking The Orbit"
                  subtitle="Chronological transitions mapping physical arts milestones to competitive technical execution."
                  badge="Chronological Line"
                />
                <Link
                  to="/journey"
                  className="flex items-center gap-2 bg-[#0D0D11] border border-white/5 hover:border-[#3B82F6] text-white text-[11px] font-mono font-bold px-5 py-3 tracking-wider uppercase transition-colors"
                >
                  <span>Read Complete Timeline</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#3B82F6]" />
                </Link>
              </div>

              {/* Horizontal Scroll Track */}
              <div className="relative overflow-x-auto pb-6 scrollbar-none">
                <div className="flex gap-6 w-max px-2">
                  {[
                    { year: "Pre-University", title: "Fine Arts Accolades", desc: "State level sculpture, district classical vocalist, precision drawing architecture." },
                    { year: "2023", title: "University Integration", desc: "B.Tech CSE Core (Data Science with IBM). Selected as Class Representative on Day 1." },
                    { year: "2025", title: "Automation Systems Intern", desc: "Engineered data visualization assets and script workflows for operational performance parsing." },
                    { year: "2025", title: "DeepDataHack Coordinator", desc: "Coded and managed operational platform mechanics for university-wide data sprint." },
                    { year: "2026", title: "1st Place Hackathon Victory", desc: "Secured top position across competitive full-stack evaluation tracks run by Suvikshan Technology." }
                  ].map((milestone, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="w-[280px] p-5 bg-[#0D0D11] border border-white/5 mx-auto flex flex-col gap-3 rounded-none relative transition-colors hover:border-[#3B82F6]/40"
                    >
                      <span className="font-mono text-[9px] text-[#3B82F6] uppercase font-bold tracking-widest">// {milestone.year}</span>
                      <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wide">{milestone.title}</h4>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed">{milestone.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED PROJECTS PRODUCTION TIERS */}
            <section className="mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <SectionHeading
                  title="Featured Core Systems"
                  subtitle="Production-grade digital architectures managing structural parameters and algorithmic logic loops."
                  badge="Code Engineering"
                />
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors"
                >
                  <span>Index All Deployed Systems</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    id: "hirefocus",
                    title: "HireFocus",
                    tagline: "AI Talent Matching Ecosystem",
                    overview: "A multidimensional recruitment node managing automated text tokenization, real-time feedback matrix setups, and interactive Kanban routing panels.",
                    stack: ["React", "Firebase Engine", "Tailwind Engine"],
                    color: "magenta" as const,
                    assetPath: "/src/assets/art/mindly app ui ux.png"
                  },
                  {
                    id: "vaize",
                    title: "Vaize Engine",
                    tagline: "Exploratory Dashboard Array",
                    overview: "High-performance visual engine handling deep file ingestion, matrix operations, cleanups, and dynamic chart layers.",
                    stack: ["Python Data Core", "Pandas", "React Canvas"],
                    color: "cyan" as const,
                    assetPath: "/src/assets/art/orbit ui ux.png"
                  },
                  {
                    id: "arambh",
                    title: "Arambh LMS",
                    tagline: "Enterprise Academic Hub",
                    overview: "Fully role-isolated system framework parsing multi-tier access profiles, secure user logs, and dynamic learning management matrix schemas.",
                    stack: ["React.js", "RBAC Engine", "Data Storage Tier"],
                    color: "violet" as const,
                    assetPath: "/src/assets/art/arambh ui ux.png"
                  }
                ].map((item) => (
                  <Interactive3DGridCard key={item.id} glowColor={item.color}>
                    <div className="flex flex-col justify-between h-full bg-[#0D0D11] border border-white/5 rounded-none p-5 group">
                      <div>
                        <div className="relative aspect-video w-full bg-[#050507] border border-white/5 overflow-hidden flex items-center justify-center mb-4">
                          <img 
                            src={item.assetPath} 
                            alt={`${item.title} Workspace Capture`} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const p = e.currentTarget.parentElement;
                              if (p) {
                                const f = p.querySelector('.proj-fallback');
                                if (f) f.classList.remove('hidden');
                              }
                            }}
                          />
                          <div className="proj-fallback hidden flex-col items-center font-mono text-[8px] text-gray-600">
                            <Terminal className="h-4 w-4 text-gray-700 animate-pulse mb-1" />
                            <span>IMAGE_NOT_FOUND</span>
                          </div>
                        </div>
                        
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#4FACFE] mb-1.5 block">
                          DEPLOYED // {item.stack.join(" • ")}
                        </span>
                        <h3 className="font-mono font-bold text-xs uppercase tracking-wide text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-5">
                          {item.overview}
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/projects/${item.id}`}
                          className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-white bg-[#050507] border border-white/5 hover:border-[#3B82F6] px-4 py-2.5 transition-colors w-full justify-center uppercase tracking-wider"
                        >
                          Explore System Architecture
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </Interactive3DGridCard>
                ))}
              </div>
            </section>

            {/* POLYMATH GRID LINKS */}
            <section className="mb-32">
              <div className="mb-12">
                <SectionHeading
                  title="The Polymath Dimensions"
                  subtitle="Physical forms, acoustic compositions, and structural literature channels feeding back into interface layouts."
                  badge="Cognitive Diversity"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Fine Sculpture", desc: "State level modeling", path: "/art", icon: Palette },
                  { title: "Classical Vocal", desc: "District rhythm masteries", path: "/music", icon: Music },
                  { title: "Published Books", desc: "Independent long fiction", path: "/book", icon: BookOpen },
                  { title: "Brand Strategy", desc: "ELVN D TRIBE generation", path: "/projects", icon: FileText }
                ].map((tile) => (
                  <Link
                    key={tile.title}
                    to={tile.path}
                    className="group relative flex flex-col items-center justify-center p-6 text-center rounded-none bg-[#0D0D11] border border-white/5 hover:border-[#3B82F6] transition-all duration-300"
                  >
                    <tile.icon className="h-5 w-5 text-gray-400 group-hover:text-[#3B82F6] group-hover:scale-110 transition-all duration-300 mb-4" />
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">{tile.title}</h4>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{tile.desc}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* AUTOMATED STATISTICS COUNTERS */}
            <section className="mb-32">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCounter targetValue={6} suffix="+" label="Systems Compiled" />
                <StatCounter targetValue={1} suffix="st" label="Hackathon Victory" />
                <StatCounter targetValue={4} suffix="" label="Art Disciplines" />
                <StatCounter targetValue={1} suffix="" label="Published Novel" />
              </div>
            </section>

            {/* TERMINAL CONTACT INTERFACE TRIGGER */}
            <section className="border border-white/5 bg-[#0D0D11] p-8 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
                <Trophy className="h-6 w-6 text-[#3B82F6] animate-pulse" />
                <span className="font-mono text-[10px] text-[#3B82F6] uppercase tracking-[0.25em] font-bold">
                  // Initialize Collaboration Protocol
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
                  Ready to optimize system math and user art?
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  Open for technical full-stack integrations, dataset architectural planning, structural UI/UX workflows, or creative design execution. Establish connection vector below.
                </p>
                <div>
                  <Link
                    to="/contact"
                    className="bg-white text-black font-mono text-[10px] font-bold tracking-widest px-8 py-4 border border-white hover:bg-transparent hover:text-white transition-all duration-300 uppercase"
                  >
                    Initialize Connection Grid
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}