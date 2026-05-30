import React, { useState, useTransition, useEffect } from 'react';
import { projects } from '../data/projects';
import { Project } from '../types';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { ArrowUpRight, SlidersHorizontal, Terminal, Cpu, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================================
// INDEX GLANCE RUNTIME COMPILER: MAP PRIMARY NODES
// ============================================================================
const localScreenshots = import.meta.glob('../assets/project/**/*.{png,jpg,jpeg,webp}', { eager: true });

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [, startTransition] = useTransition();
  const [resolvedThumbnails, setResolvedThumbnails] = useState<Record<string, string>>({});

  const categories = ['All', 'Full-Stack', 'Data Science', 'AI/ML', 'UI/UX', 'Other'];

  // Match and cache a primary thumbnail file for every individual systemic node
  useEffect(() => {
    const thumbCache: Record<string, string> = {};
    const assetEntries = Object.entries(localScreenshots);

    projects.forEach((project) => {
      // 1. Core target normalization
      const targetId = project.id.toLowerCase().trim();
      const targetIdClean = targetId.replace(/-/g, ''); // Removes hyphens (e.g., 'intelligent-schedule-matrix' -> 'intelligentschedulematrix')
      
      // Explicit array containing absolute literal folder variations to match directory spaces perfectly
      const folderVariants: string[] = [targetId, targetIdClean];
      
      // Multi-word systemic mapping injection to dynamically handle directory spacing variances
      if (targetId.includes('schedule') || targetId.includes('timetable') || targetId.includes('matrix')) {
        folderVariants.push('intelligent schedule matrix', 'intelligentschedulematrix');
      }
      if (targetId.includes('science') || targetId.includes('engine') || targetId.includes('automated')) {
        folderVariants.push('automated data science engine', 'automateddatascienceengine');
      }
      if (targetId.includes('deepdata') || targetId.includes('hack')) {
        folderVariants.push('deepdatahack platform', 'deepdatahackplatform');
      }

      let matchedUrl = '';

      // STEP 1: Strict explicit match lookup (Brackets / explicit renaming variants)
      for (const [filePath, module] of assetEntries) {
        const cleanPath = filePath.toLowerCase();
        const pathNoSpaces = cleanPath.replace(/ /g, '');
        
        // Comprehensive check matching clean directories against variations with or without spacing layouts
        const isInTargetFolder = folderVariants.some(variant => {
          const variantNoSpaces = variant.replace(/ /g, '');
          return cleanPath.includes(`/project/${variant}/`) || pathNoSpaces.includes(`/project/${variantNoSpaces}/`);
        });

        if (isInTargetFolder) {
          if (
            cleanPath.includes(`(${targetId})`) || 
            cleanPath.includes('rename') || 
            cleanPath.includes('renname') ||
            cleanPath.includes('(elven)') ||
            cleanPath.includes('(mindly)') ||
            cleanPath.includes('(orbit)') ||
            cleanPath.includes('(quill)') ||
            cleanPath.includes('(time table)')
          ) {
            if ((module as any)?.default) {
              matchedUrl = (module as any).default;
              break;
            }
          }
        }
      }

      // STEP 2: Fallback strategy - Pick the very first file sitting in that respective folder
      if (!matchedUrl) {
        for (const [filePath, module] of assetEntries) {
          const cleanPath = filePath.toLowerCase();
          const pathNoSpaces = cleanPath.replace(/ /g, '');
          
          const isInTargetFolder = folderVariants.some(variant => {
            const variantNoSpaces = variant.replace(/ /g, '');
            return cleanPath.includes(`/project/${variant}/`) || pathNoSpaces.includes(`/project/${variantNoSpaces}/`);
          });

          if (isInTargetFolder) {
            if ((module as any)?.default) {
              matchedUrl = (module as any).default;
              break;
            }
          }
        }
      }

      // If mapped file found, use it; otherwise write 'TEXT_FALLBACK' identifier to invoke UI placeholder
      thumbCache[project.id] = matchedUrl || '';
    });

    setResolvedThumbnails(thumbCache);
  }, []);

  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      setActiveCategory(cat);
    });
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category?.includes(activeCategory));

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#C850C0]/30 antialiased font-sans">
        
        {/* Spatial Accent Ambient Glow Fields */}
        <div className="absolute top-[8%] right-[25%] w-[400px] h-[400px] bg-[#C850C0]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[15%] left-[15%] w-[350px] h-[350px] bg-[#4FACFE]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-16">
            <SectionHeading
              title="What I've Built"
              subtitle="Production-grade, highly optimized functional systems executing specific solutions — not toy playgrounds."
              badge="Systems Engineering"
            />
          </header>

          {/* CHIPS FILTER CATEGORY CONTROL BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 border-b border-white/5 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gray-500 mr-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#4FACFE]" />
                <span>Filter_Nodes:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 rounded-none ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                      : 'text-gray-400 hover:text-white bg-[#0D0D11] border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="font-mono text-[9px] tracking-widest text-gray-500 flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-gray-600" />
              <span>QUERY_STREAM: SHOWING {filteredProjects.length} OF {projects.length} SYSTEMS</span>
            </div>
          </div>

          {/* SYSTEM REPOS PRODUCTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => {
              const displayImage = resolvedThumbnails[project.id];
              
              return (
                <GlowCard
                  id={`project-card-${project.id}`}
                  key={project.id}
                  glowColor={project.featured ? 'magenta' : 'cyan'}
                  className="flex flex-col justify-between h-full group bg-[#0D0D11] border border-white/5 rounded-none p-5 transition-all duration-300 hover:border-white/10"
                >
                  <div>
                    {/* Native Hardware Screenshot Media Frame */}
                    <div className="relative overflow-hidden mb-5 border border-white/5 bg-[#050507] aspect-video w-full flex items-center justify-center">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={`${project.title} runtime matrix hardware screen capture`}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        /* BRUTALIST SYSTEM DIAGRAM TEXT FALLBACK - FOR MISSING IMAGES */
                        <div className="absolute inset-0 p-4 bg-[#08080c] font-mono text-[9px] text-gray-500 flex flex-col justify-between border border-dashed border-white/5 group-hover:border-white/20 transition-colors duration-300 overflow-hidden">
                          <div className="flex justify-between items-center text-gray-600 border-b border-white/5 pb-1.5">
                            <span>SYS_STREAM // {project.id.toUpperCase()}</span>
                            <span className="text-[#4FACFE] animate-pulse">● LIVE</span>
                          </div>
                          
                          <div className="space-y-1 my-auto tracking-tight select-none opacity-40 group-hover:opacity-80 transition-opacity duration-300 text-left">
                            <p className="text-white font-bold text-[10px] truncate">// DEV_BUILD_ACTIVE</p>
                            <p className="truncate">CORE_STACK: {project.stack?.join(' | ') || 'N/A'}</p>
                            <p className="text-[#C850C0]">STATUS_NODE: INIT_EXECUTION_SUCCESS</p>
                            <p className="text-gray-600 truncate">BUFFER_ADDR: 0x7FFF5FBFF608</p>
                          </div>

                          <div className="flex justify-between items-center text-[8px] text-gray-600 pt-1.5 border-t border-white/5">
                            <span>STANDALONE_CORE</span>
                            <span>REV_2026</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Architectural Floating Status Token */}
                      <span className="absolute top-3 right-3 font-mono text-[8px] uppercase tracking-widest bg-[#050507]/90 text-[#4FACFE] px-2.5 py-1 border border-[#4FACFE]/20 backdrop-blur-md shadow-lg z-10 font-bold">
                        {project.status}
                      </span>
                    </div>

                    {/* Top Stack Architecture Pill Markers */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack?.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] tracking-wider text-gray-500 uppercase bg-[#050507] px-2 py-0.5 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Main Identity Header */}
                    <h3 className="text-xl font-black tracking-tight text-white mb-2 uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                      {project.title}
                    </h3>

                    {/* Project Tagline Context */}
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-8 min-h-[36px]">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Secure Target Deep Link Button */}
                  <div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center justify-between w-full font-mono text-[10px] uppercase tracking-widest font-bold px-5 py-3.5 bg-transparent border border-white/10 text-gray-300 group-hover:text-white group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 rounded-none"
                    >
                      <span className="flex items-center gap-2">
                        <Cpu className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                        <span>Inspect Node Details</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#C850C0] group-hover:text-black transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </GlowCard>
              );
            })}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}