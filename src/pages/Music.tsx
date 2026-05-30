import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { Music as MusicIcon, Volume2, Award, Mic2, Compass, Terminal, Radio } from 'lucide-react';

export default function Music() {
  const ytThumbnailUrl = "https://i.ytimg.com/vi/HBe4tr1Pr5s/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD3CJay-Nzb0WpCfbBYukd-X6o9Ug";

  const tracksList = [
    { title: "Kya Pata?", type: "Indie-Folk Single Release", status: "LIVE RELEASE" },
    { title: "Naabeena Alaap Session", type: "Classical Raga Stream", status: "PRODUCTION CACHE" }
  ];

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#4FACFE]/30 antialiased font-sans">
        
        {/* Spatial Deep Fields */}
        <div className="absolute top-[30%] left-1/4 w-[400px] h-[400px] bg-[#4FACFE]/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-10 w-[350px] h-[350px] bg-[#6B3FA0]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-16">
            <SectionHeading
              title="Acoustic Rhythms & Lyrics"
              subtitle="Studying the mathematical bounds of Indian Classical Ragas and traditional compositions to reinforce functional frontend execution rules."
              badge="Performing Arts Core"
            />
          </header>

          {/* SECTION 1 — CORE PERFORMANCE SPECS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 border border-white/5 bg-[#0D0D11] p-3 rounded-full group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#4FACFE]/20 to-[#6B3FA0]/15 rounded-full blur-xl opacity-75 pointer-events-none" />
                <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#050507] flex items-center justify-center relative">
                  <img
                    src={ytThumbnailUrl}
                    alt="Vocal Performance Visual"
                    className="w-full h-full object-cover scale-110 opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
              <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase mt-4">
                STREAM_SOURCE // YT_THUMBNAIL_BUFFER
              </span>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#4FACFE] font-mono text-[10px] uppercase tracking-widest bg-[#4FACFE]/5 border border-[#4FACFE]/10 px-3 py-1.5 self-start font-bold">
                <Mic2 className="h-3.5 w-3.5 animate-pulse" />
                <span>District Level Classical Vocalist</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Vocal Harmony & Computational Rhythm
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                As a trained classical Indian vocalist, I trace the structural architecture of Ragas and Talas. Singing classical arrays requires deep cognitive memory management—mapping micro-intervals, note groupings, and strict metric loops. Managing these complex physical parameters directly mirrors configuring parameters and data pipelines across software networks.
              </p>

              <div className="p-4 bg-[#08080C] border border-white/5 flex gap-4 items-start rounded-none">
                <Award className="h-4 w-4 text-[#4FACFE] shrink-0 mt-0.5" />
                <div className="font-mono text-[11px]">
                  <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Vocal Track Records</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Honored in district classical events for structural timing control and tone precision matrix preservation.</p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2 — AUDIO TRACK REGISTERS */}
          <section className="mb-24">
            <div className="mb-12">
              <SectionHeading
                title="Vocal Tracks & Recordings"
                subtitle="Composition streams tracking modern acoustic writing and independent classical arrangement sets."
                badge="Audio Registry System"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tracksList.map((track, idx) => (
                <GlowCard key={idx} id={`track-${idx}`} glowColor="cyan" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex flex-col justify-between">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 bg-[#4FACFE]/5 border border-[#4FACFE]/10 flex items-center justify-center text-[#4FACFE]">
                      <Volume2 className="h-4 w-4 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                        {track.title}
                      </h3>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-gray-500">
                        {track.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#050507] border border-white/5 font-mono text-[10px]">
                    <div className="flex items-center justify-between mb-2 text-[8px] text-gray-500">
                      <span>STATUS: {track.status}</span>
                      <span className="text-[#4FACFE]">0:00 // SOURCE_PENDING</span>
                    </div>
                    <div className="w-full h-px bg-white/5 relative overflow-hidden mb-4">
                      <div className="absolute top-0 left-0 w-1/12 h-full bg-[#4FACFE]" />
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-[9px] text-[#4FACFE] border border-[#4FACFE]/20 bg-[#4FACFE]/5 py-2 uppercase tracking-wider font-bold">
                      <Radio className="h-3.5 w-3.5 animate-spin-slow" />
                      <span>STREAM PIPELINE ARCHIVED</span>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* SECTION 3 — LIVE PERFORMANCE MATRIX OVERLAY */}
          <section className="mb-12 max-w-4xl mx-auto border border-white/5 bg-[#0D0D11] p-6 text-center relative group">
            <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-[#4FACFE]" />
                <span>Live_Stage_Capture // Stream Node</span>
              </div>
              <span className="text-[#4FACFE] animate-pulse">// SYSTEM_DEPLOY_DELAY</span>
            </div>
            
            <div className="relative aspect-video w-full bg-[#050507] border border-white/5 overflow-hidden flex items-center justify-center">
              <img 
                src={ytThumbnailUrl} 
                alt="Acoustic Session Stage Visual" 
                className="w-full h-full object-cover opacity-30 blur-xs scale-105" 
              />
              
              {/* Coming Soon Absolute Centered Core Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#050507]/40 backdrop-blur-xs z-10">
                <div className="border border-white/10 bg-[#050507] px-6 py-4 shadow-2xl text-center">
                  <h4 className="font-mono font-black text-sm tracking-[0.3em] text-white uppercase animate-pulse">
                    COMING SOON
                  </h4>
                  <div className="w-8 h-px bg-[#4FACFE] mx-auto mt-2 mb-1" />
                  <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block">
                    BUFFERS_INITIALIZING // COGNITIVE_AUDIO
                  </span>
                </div>
              </div>
            </div>
            
            <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase text-center block mt-3">
              EXTERNAL_REF: STATIC_YOUTUBE_RESOURCES_INDEX
            </span>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}