import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { BookOpen, ExternalLink, Bookmark, Quote, Cpu, Terminal, ImageIcon } from 'lucide-react';

// ============================================================================
// BOOK MODULE ASSET MATRIX RESOLVER
// ============================================================================
const bookAssets = import.meta.glob('../assets/art/*book*.{png,jpg,jpeg,webp,PNG,JPEG}', { eager: true });

export default function Book() {
  const [resolvedImages, setResolvedImages] = useState<{ cover: string; promo: string }>({ cover: '', promo: '' });

  useEffect(() => {
    let coverUrl = '';
    let promoUrl = '';

    Object.entries(bookAssets).forEach(([path, module]: [string, any]) => {
      if (!module || !module.default) return;
      
      const fileName = path.toLowerCase();
      if (fileName.includes('about my book')) {
        promoUrl = module.default;
      } else if (fileName.includes('book.png')) {
        coverUrl = module.default;
      }
    });

    setResolvedImages({ cover: coverUrl, promo: promoUrl });
  }, []);

  const steps = [
    { num: "01", title: "Conceptual Sparks", desc: "Forging characters, statistical world setups, and structural parallels between system execution and human choice metrics." },
    { num: "02", title: "The Draft Protocol", desc: "Rigorous typing routines; compiling chapters during long night runs alongside engineering data assignments." },
    { num: "03", title: "Refining & Editing", desc: "Filtering narrative pacing, tightening prose syntax metrics, and cleaning text structures like high-level source refactoring." },
    { num: "04", title: "Publication Stream", desc: "Checking absolute page layout coordinates, configuring typeface alignments, and deploying onto global reading networks." }
  ];

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#C850C0]/30 antialiased font-sans">
        
        {/* Spatial Ambient Blur Highlight Arrays */}
        <div className="absolute top-[15%] right-[20%] w-[450px] h-[450px] bg-[#D4600A]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[25%] left-[10%] w-[380px] h-[380px] bg-[#C850C0]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-20">
            <SectionHeading
              title="The Published Author"
              subtitle="Leveraging structural language models and literary engineering to design conceptual worlds, scale narratives, and map cognitive pathways."
              badge="Literature & Media Core"
            />
          </header>

          {/* SECTION 1 — BOOK CORE COVER PRESENTATION GRID */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm border border-white/5 bg-[#0D0D11] p-4 group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4600A]/10 to-[#C850C0]/10 blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="relative aspect-[3/4] w-full bg-[#050507] border border-white/5 overflow-hidden flex items-center justify-center">
                  {resolvedImages.cover ? (
                    <img
                      src={resolvedImages.cover}
                      alt="Published Book Cover Blueprint"
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500 ease-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600 font-mono text-[10px]">
                      <ImageIcon className="h-5 w-5 opacity-40 animate-pulse text-[#D4600A]" />
                      <span>RESOLVING_COVER_BUFFER...</span>
                    </div>
                  )}
                </div>
              </div>
              <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase mt-3">
                SRCDIR_PTR: /src/assets/art/book.png
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#D4600A] font-mono text-[10px] uppercase tracking-widest bg-[#D4600A]/5 border border-[#D4600A]/10 px-3 py-1.5 self-start font-bold">
                <Bookmark className="h-3.5 w-3.5" />
                <span>Featured Literary Node Launch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Chronicles of the Scribing Mind
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                As a natural extension of structural polymathy, I have authored and deployed an independent long-form book system. The text unifies intricate psychological architecture with speculative sci-fi frameworks—investigating human survival thresholds, cognitive load optimization, and the deep alignment rules linking biological choices with computing setups.
              </p>

              {/* Technical Spec Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-white/5 bg-[#08080C] p-4 font-mono text-[10px]">
                <div className="border-b sm:border-b-0 sm:border-r border-white/5 pb-3 sm:pb-0 sm:pr-4">
                  <span className="text-gray-500 block uppercase tracking-wider mb-1">SYSTEM CLASSIFICATION</span>
                  <span className="text-white font-bold uppercase">Speculative Fiction / Psychological Narrative</span>
                </div>
                <div className="sm:pl-2">
                  <span className="text-gray-500 block uppercase tracking-wider mb-1">DISTRIBUTION CHANNELS</span>
                  <span className="text-white font-bold uppercase">Global E-Retail Networks & Print-On-Demand</span>
                </div>
              </div>

              {/* Purchase Trigger Pipelines */}
              <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-[10px]">
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-black font-bold px-6 py-4 border border-white hover:bg-transparent hover:text-white transition-all duration-300 uppercase tracking-widest"
                >
                  <span>Access Node on Amazon</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 2 — SYSTEM SCREENSHOT PROMOTIONAL INTERACTION DISPLAY */}
          {resolvedImages.promo && (
            <section className="mb-28 border border-white/5 bg-[#0D0D11] p-5">
              <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-[#D4600A]" />
                <span>Ecosystem_Display // Analytics / About Segment Media Capture</span>
              </div>
              <div className="border border-white/5 bg-[#050507] w-full overflow-hidden">
                <img 
                  src={resolvedImages.promo} 
                  alt="Ecosystem Context Profile View" 
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase text-center block mt-3">
                SRCDIR_PTR: /src/assets/art/Google about my book.PNG
              </span>
            </section>
          )}

          {/* SECTION 3 — SERIF QUOTES CORE CONCEPT WRAPPER */}
          <section className="mb-28 max-w-4xl mx-auto border-t border-b border-white/5 py-16 relative">
            <Quote className="h-12 w-12 text-gray-800 absolute top-6 left-0 opacity-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-6 text-center max-w-2xl mx-auto">
              <span className="font-mono text-[9px] text-[#D4600A] uppercase tracking-[0.25em] font-bold block">
                Selected Text Excerpt // Systems Engineering Parallel
              </span>
              
              <p className="font-serif italic text-base sm:text-lg text-gray-300 leading-relaxed px-4">
                "We search for constants in a sea of fluctuating coordinates. We construct database schemas to catch transient memories, unaware that the data we gather is merely a shadow of the sculpture we left behind on physical shores."
              </p>
              
              <div className="w-12 h-px bg-[#D4600A]/40 mx-auto" />
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                — Chronicles of the Scribing Mind • Chapter IV
              </span>
            </div>
          </section>

          {/* SECTION 4 — ROADMAP PACKAGING PRODUCTION TIMELINE */}
          <section className="mb-12">
            <div className="mb-12">
              <SectionHeading
                title="The Book Production Story"
                subtitle="Chronological processing phases of translating systemic human matrix concepts into printable literature assets."
                badge="Milestone Flow Stack"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((stage) => (
                <GlowCard key={stage.num} id={`step-card-${stage.num}`} glowColor="orange" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none relative flex flex-col justify-between min-h-[180px]">
                  <div>
                    <span className="font-mono font-black text-2xl text-gray-800 block mb-2">
                      {stage.num}
                    </span>
                    <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  <span className="font-mono text-[7px] text-gray-600 uppercase tracking-widest mt-4">// PIPELINE_STAGE_{stage.num}</span>
                </GlowCard>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}