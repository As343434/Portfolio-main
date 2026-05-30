import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { 
  ArrowLeft, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Calendar, 
  Layers, 
  Terminal, 
  Cpu, 
  ShieldAlert,
  Image as ImageIcon,
  Activity,
  Flame,
  Lock,
  Compass,
  LayoutGrid
} from 'lucide-react';

// ============================================================================
// VITE DYNAMIC ASSET COMPILER: AUTO-MAP LOCAL src/assets/project DIAGRAMS
// ============================================================================
const localScreenshots = import.meta.glob('../assets/project/**/*.{png,jpg,jpeg,webp}', { eager: true });

// ============================================================================
// STRICT REAL DEPLOYMENT REGISTRY (NO PLUGINS / NO KEYWORD GUESSING)
// ============================================================================
const deploymentRegistry: Record<string, string> = {
  'vaize': 'https://vaize.vercel.app',
  'mindly': 'https://mindly-us.vercel.app',
  'mindmetric': 'https://mindly-us.vercel.app',
  'elvn-d-tribe': 'https://elven-taupe.vercel.app',
  'sillu-rose': 'https://sillu-rose.vercel.app',
  'neuralviz-lab': 'https://sillu-rose.vercel.app',
  'ova': 'https://ova-rho.vercel.app',
  'astro': 'https://astro-navy-chi.vercel.app',
  'arambh': 'https://arambh-phi.vercel.app',
  'quill': 'https://quill-kappa-jade.vercel.app',
  'orbit': 'https://orbit-omega-two.vercel.app',
  'ash-portfolio': 'https://ash-eta-eight.vercel.app'
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [systemImages, setSystemImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'telemetry'>('blueprint');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const currentProjectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[currentProjectIndex];

  // ============================================================================
  // TELEMETRY MATCHING ENGINE: IDENTIFY ASSETS BY FOLDER LOCATION
  // ============================================================================
  useEffect(() => {
    if (!project) return;

    setIsCompiling(true);
    const matchedUrls: string[] = [];
    
    const targetId = project.id.toLowerCase().trim();
    const targetIdClean = targetId.replace(/-/g, ''); 
    
    const folderVariants: string[] = [targetId, targetIdClean];
    
    if (targetId.includes('schedule') || targetId.includes('timetable') || targetId.includes('matrix')) {
      folderVariants.push('intelligent schedule matrix', 'intelligentschedulematrix');
    }
    if (targetId.includes('science') || targetId.includes('engine') || targetId.includes('automated')) {
      folderVariants.push('automated data science engine', 'automateddatascienceengine');
    }
    if (targetId.includes('deepdata') || targetId.includes('hack')) {
      folderVariants.push('deepdatahack platform', 'deepdatahackplatform');
    }

    Object.entries(localScreenshots).forEach(([filePath, module]: [string, any]) => {
      const cleanPath = filePath.toLowerCase();
      const pathNoSpaces = cleanPath.replace(/ /g, '');

      const isInTargetFolder = folderVariants.some(variant => {
        const variantNoSpaces = variant.replace(/ /g, '');
        return cleanPath.includes(`/project/${variant}/`) || pathNoSpaces.includes(`/project/${variantNoSpaces}/`);
      });

      if (isInTargetFolder) {
        if (module && module.default) {
          matchedUrls.push(module.default);
        }
      }
    });

    setSystemImages(matchedUrls);
    
    const timer = setTimeout(() => setIsCompiling(false), 350);
    return () => clearTimeout(timer);
  }, [project, id]);

  // ============================================================================
  // EXCEPTION ROUTINE: POINTER NULL
  // ============================================================================
  if (!project) {
    return (
      <PageTransition>
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-[#050507]">
          <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="h-20 w-20 rounded-none bg-red-950/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-8 font-mono animate-pulse">
            <ShieldAlert className="h-9 w-9" />
          </div>
          
          <span className="font-mono text-[10px] tracking-[0.5em] text-red-500 uppercase mb-3 block">
            FATAL_EXCEPTION // CORE_ID_NULL
          </span>
          <h1 className="font-sans font-black text-4xl md:text-5xl text-white tracking-tighter uppercase mb-6 max-w-xl leading-none">
            SYSTEM HASH POINTER UNRESOLVED
          </h1>
          <p className="font-mono text-xs text-gray-500 max-w-md mb-10 leading-relaxed border border-white/5 p-4 bg-[#0A0A0F]">
            The requested pointer "{id}" yields zero matched records against the active database index tables.
          </p>
          
          <Link
            to="/projects"
            className="flex items-center gap-3 bg-transparent hover:bg-white hover:text-black border border-white/20 px-8 py-4 text-xs text-white font-mono uppercase tracking-widest transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Re-index Environment Matrix</span>
          </Link>
        </div>
      </PageTransition>
    );
  }

  // Pure explicit lookup. If the project ID is not in your deploymentRegistry list, matchedLiveUrl stays completely empty.
  const matchedLiveUrl = project.liveUrl || deploymentRegistry[project.id.toLowerCase().trim()] || '';

  const prevProject = projects[currentProjectIndex - 1] || projects[projects.length - 1];
  const nextProject = projects[currentProjectIndex + 1] || projects[0];

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-28 bg-[#050507] text-white selection:bg-[#C850C0]/30 antialiased font-sans">
        
        {/* Structural Background Blur Fields */}
        <div className="absolute top-[8%] left-[2%] w-[500px] h-[500px] bg-[#4FACFE]/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[45%] right-[2%] w-[550px] h-[550px] bg-[#C850C0]/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-purple-950/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Top Structural Navigation Segment */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-white/5 pb-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#4FACFE] group-hover:-translate-x-1 transition-transform" />
              <span>Index Root / Active System Nodes</span>
            </Link>
            
            <div className="flex items-center gap-4 font-mono text-[9px] text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${isCompiling ? 'bg-amber-500 animate-spin' : 'bg-green-500 animate-pulse'}`} />
                SHELL: MACBOOK_PRO_DARWIN
              </span>
              <span>•</span>
              <span>SYS_PTR: 0x7FFF9A3B_{project.id.toUpperCase().slice(0, 2)}</span>
            </div>
          </div>

          {/* MAIN DOCUMENT ATTRIBUTES HEADER PANEL */}
          <header className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-2 items-center mb-6">
                  <div className="flex items-center gap-1 font-mono text-[9px] text-gray-500 bg-white/5 px-2 py-0.5 border border-white/5 uppercase">
                    <Terminal className="h-3 w-3 text-[#4FACFE]" />
                    <span>SYS_CLASS</span>
                  </div>
                  {project.category?.map((cat, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[9px] text-[#C850C0] uppercase tracking-widest bg-[#C850C0]/5 px-3 py-1 border border-[#C850C0]/15"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F0EBF8] to-gray-500">
                  {project.title}
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl font-light text-gray-400 max-w-3xl leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Functional Actions Frame */}
              <div className="flex items-center gap-3 self-start lg:pt-3 shrink-0 w-full sm:w-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-[#0D0D11] border border-white/10 text-gray-400 hover:text-white hover:border-white/40 hover:bg-[#121217] transition-all duration-300 flex-grow sm:flex-grow-0 flex justify-center items-center"
                    title="Examine Source Framework"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {matchedLiveUrl && (
                  <a
                    href={matchedLiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 border border-white hover:bg-transparent hover:text-white transition-all duration-300 flex-grow sm:flex-grow-0"
                  >
                    <span>Execute Module</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Micro Parametric Specs Strip */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center gap-y-4 gap-x-10 font-mono text-[10px] text-gray-500 border-t border-b border-white/5 py-5 mt-12 bg-[#08080C]/40 px-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-[#4FACFE]" />
                <span className="tracking-wider text-gray-400">ENGINEERING_EPOCH: <strong className="text-white font-normal">{project.year}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-[#C850C0]" />
                <span className="tracking-wider text-gray-400">DEPLOYMENT_STAGE: <strong className="text-white font-normal">{project.status}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="tracking-wider text-gray-400">METRIC_LOG: <strong className="text-white font-normal">STABLE_EXEC</strong></span>
              </div>
              <div className="hidden lg:flex items-center gap-2 ml-auto text-gray-600">
                <Lock className="h-3.5 w-3.5 text-yellow-600/60" />
                <span>INTEGRITY_VERIFIED_SECURE</span>
              </div>
            </div>
          </header>

          {/* DYNAMIC COMPILER SCREENSHOT VIEW GRID */}
          <section className="mb-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
                <ImageIcon className="h-4 w-4 text-[#4FACFE]" />
                <span>Rendered Environment Matrix ({systemImages.length} Active Targets)</span>
              </div>

              {/* Embedded Tab Control System */}
              <div className="flex border border-white/5 bg-[#0A0A0F] p-0.5">
                <button 
                  onClick={() => setActiveTab('blueprint')}
                  className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all ${activeTab === 'blueprint' ? 'bg-white/10 text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  System View
                </button>
                <button 
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all ${activeTab === 'telemetry' ? 'bg-white/10 text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Raw Asset Log
                </button>
              </div>
            </div>

            {/* Matrix Logic Conditional Rendering */}
            {systemImages.length > 0 && activeTab === 'blueprint' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {systemImages.map((imgSrc, index) => (
                  <div key={index} className="flex flex-col gap-3 group">
                    <GlowCard 
                      id={`snapshot-${index}`} 
                      glowColor={index % 2 === 0 ? 'cyan' : 'magenta'}
                      className="p-0 bg-[#0D0D11] border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-white/20 rounded-none h-auto"
                    >
                      <div className="relative overflow-hidden aspect-video bg-[#050507]">
                        <img 
                          src={imgSrc} 
                          alt={`${project.title} runtime panel interface capture view ${index + 1}`}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#050507]/80 backdrop-blur-md border border-white/5 px-2 py-0.5 font-mono text-[7px] text-gray-400 tracking-widest uppercase">
                          PANEL_NODE_0{index + 1}
                        </div>
                      </div>
                    </GlowCard>
                    <span className="font-mono text-[8px] text-gray-600 tracking-widest uppercase px-1 flex justify-between">
                      <span>// FILE_PTR: Node Asset {index + 1}</span>
                      <span className="text-green-500 font-bold">STATUS_OK</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : activeTab === 'telemetry' && systemImages.length > 0 ? (
              /* Telemetry Terminal Logging Module */
              <div className="bg-[#08080C] border border-white/5 p-6 font-mono text-xs text-gray-400 space-y-2.5 overflow-x-auto">
                <p className="text-gray-600">// VITE ENVIRONMENT COMPILER META ENGINE - DUMPING FILE LINK BUFFERS</p>
                <p className="text-[#4FACFE]">ash@ASHs-MacBook-Pro Portfolio--main % mapping assets inline against current folder structure...</p>
                {systemImages.map((imgSrc, idx) => (
                  <div key={idx} className="p-2.5 bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Compass className="h-3.5 w-3.5 text-[#C850C0]" />
                      MAP_PTR_[0{idx}]: static_distribution_bundle_{project.id.toLowerCase()}_{idx}.png
                    </span>
                    <span className="text-gray-600 truncate text-[10px] max-w-md">{imgSrc}</span>
                  </div>
                ))}
                <p className="text-green-500 pt-2">// EXECUTION COMPLETED: ALL LOCAL STREAMS LOADED AND VERIFIED VIA ASSETS/PROJECT MAP.</p>
              </div>
            ) : (
              /* AUTOMATIC TEXT TERMINAL STREAM FALLBACK IF MAP DIVERGES */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 w-full">
                  <div className="bg-[#08080c] border border-dashed border-white/10 p-12 sm:p-16 flex flex-col items-center justify-center text-center min-h-[380px] relative w-full group">
                    <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-600">// SYSTEM_DYNAMIC_FALLBACK_STREAM</div>
                    <div className="absolute top-4 right-4 font-mono text-[8px] text-green-500 animate-pulse">● FEED_ONLINE</div>
                    
                    <div className="w-full max-w-md font-mono text-[10px] text-left text-gray-400 space-y-2 bg-[#050507] p-5 border border-white/5 shadow-2xl">
                      <p className="text-white font-bold border-b border-white/5 pb-2 uppercase tracking-wider text-[11px]">// TERMINAL_REPOS: {project.title}</p>
                      <p className="pt-1"><span className="text-[#4FACFE]">SYS_BUILD:</span> SUCCESSFUL_INITIALIZATION</p>
                      <p><span className="text-[#C850C0]">CORE_STACK:</span> {project.stack?.slice(0, 4).join(' // ') || 'N/A'}</p>
                      <p><span className="text-gray-500">SECTOR_PTR:</span> 0x7FFF5FBFF608_{project.id.slice(0, 2).toUpperCase()}</p>
                      <p className="text-gray-600 text-[9px] pt-3 leading-relaxed">
                        Notice: Local media assets stream unmapped for this quadrant. Standalone pipeline is running live simulations using defined deployment architecture parameters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 h-full min-h-[380px]">
                  <div className="bg-[#0D0D11] border border-white/5 p-6 flex flex-col justify-center items-center flex-grow text-center min-h-[182px] font-mono text-[9px] text-gray-600 tracking-widest uppercase">
                    <span>// CHANNEL_AA_FEED_RAW</span>
                    <span className="text-[8px] text-gray-700 mt-1">METRIC: 100% OK</span>
                  </div>
                  <div className="bg-[#0D0D11] border border-white/5 p-6 flex flex-col justify-center items-center flex-grow text-center min-h-[182px] font-mono text-[9px] text-gray-600 tracking-widest uppercase">
                    <span>// CHANNEL_BB_FEED_RAW</span>
                    <span className="text-[8px] text-gray-700 mt-1">INTEGRITY: SECURE</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* MAIN ARCHITECTURAL ANALYSIS SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            
            {/* Left Column Description Layout */}
            <div className="lg:col-span-8 flex flex-col gap-14">
              
              {/* Field 01: Systems Engineering Abstract */}
              <div className="group">
                <h2 className="font-mono text-xs text-[#4FACFE] uppercase tracking-[0.35em] mb-5 flex items-center gap-2">
                  <span className="h-1 w-3 bg-[#4FACFE]" />
                  01 // Core Architectural Overview
                </h2>
                <p className="text-base text-gray-400 font-light leading-relaxed tracking-wide whitespace-pre-line">
                  {project.overview}
                </p>
              </div>

              {/* Field 02: Analytical Problem Statement */}
              <div>
                <h2 className="font-mono text-xs text-red-400 uppercase tracking-[0.35em] mb-5 flex items-center gap-2">
                  <span className="h-1 w-3 bg-red-400" />
                  02 // Logistical Solution Complexity
                </h2>
                <div className="p-6 sm:p-8 bg-[#09090D] border border-white/5 rounded-none relative overflow-hidden group hover:border-white/10 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Flame className="h-16 w-16 text-red-500" />
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed relative z-10">
                    {project.problem}
                  </p>
                </div>
              </div>

              {/* Field 03: Feature Verification Logs */}
              <div>
                <h2 className="font-mono text-xs text-[#C850C0] uppercase tracking-[0.35em] mb-6 flex items-center gap-2">
                  <span className="h-1 w-3 bg-[#C850C0]" />
                  03 // Functional Parameter Audits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features?.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0D0D11] border border-white/5 flex items-start gap-4 hover:border-white/10 hover:bg-[#111116] transition-all duration-300"
                    >
                      <div className="flex items-center justify-center font-mono text-[10px] text-[#C850C0] mt-0.5 shrink-0 bg-white/[0.02] border border-white/5 h-6 w-8">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono uppercase text-gray-500 text-[8px] tracking-wider">NODE_ASSERT</span>
                        <p className="text-xs text-gray-300 font-light leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side Structural Tech Stack Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-[#0D0D11] border border-white/5 p-6 sm:p-8 rounded-none relative">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#050507] px-3 font-mono text-[9px] text-gray-600 tracking-widest border-l border-r border-white/5">
                  SYS_CONF_v4.1
                </div>

                <h3 className="font-mono text-xs tracking-widest text-white uppercase mb-8 flex items-center gap-2.5 border-b border-white/5 pb-4">
                  <Cpu className="h-4 w-4 text-[#4FACFE]" />
                  <span>Deployment Stack</span>
                </h3>
                
                <div className="space-y-6">
                  {project.architecture?.map((layer, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 pb-6 border-l border-l-white/10 last:pb-0 last:border-l-0"
                    >
                      <div className="absolute left-[-3.5px] top-1.5 h-1.5 w-1.5 rounded-full bg-[#4FACFE] shadow-[0_0_10px_#4FACFE]" />
                      
                      <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#4FACFE] block mb-1.5 font-bold">
                        LAYER_NODE_0{idx + 1}
                      </span>
                      <p className="text-xs font-light text-gray-300 leading-relaxed">
                        {layer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Compilation Tech Badges */}
                <div className="mt-10 pt-6 border-t border-white/5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gray-500 block mb-3 font-bold">
                    COMPILER_RESOURCES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack?.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-[9px] tracking-wider px-3 py-1 bg-[#050507] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </section>

          {/* LOWER RUNTIME LOOP INTERACTION PANEL */}
          <footer className="flex items-center justify-between border-t border-white/5 pt-10 mt-20 gap-6">
            <Link
              to={`/projects/${prevProject.id}`}
              className="flex items-center gap-4 font-mono text-[10px] text-gray-400 hover:text-white transition-colors max-w-[280px] group text-left"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-[#4FACFE] group-hover:-translate-x-1.5 transition-transform duration-300" />
              <div className="truncate">
                <span className="text-[8px] tracking-[0.2em] text-gray-600 block uppercase">PREV_NODE</span>
                <span className="font-bold tracking-tight truncate hidden sm:block uppercase mt-1 text-gray-300 group-hover:text-white">{prevProject.title}</span>
              </div>
            </Link>

            <Link
              to="/projects"
              className="font-mono text-[9px] text-white uppercase font-bold tracking-[0.3em] bg-[#0D0D11] border border-white/10 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
            >
              <LayoutGrid className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
              <span>INDEX_MATRIX</span>
            </Link>

            <Link
              to={`/projects/${nextProject.id}`}
              className="flex items-center gap-4 font-mono text-[10px] text-gray-400 hover:text-white transition-colors max-w-[280px] group text-right"
            >
              <div className="truncate">
                <span className="text-[8px] tracking-[0.2em] text-gray-600 block uppercase">NEXT_NODE</span>
                <span className="font-bold tracking-tight truncate hidden sm:block uppercase mt-1 text-gray-300 group-hover:text-white">{nextProject.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#C850C0] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </footer>

        </div>
      </div>
    </PageTransition>
  );
}