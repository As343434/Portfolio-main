import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { Link } from 'react-router-dom';
import { BookOpen, Newspaper, FileText, ArrowUpRight, Compass, Flame, Terminal, Cpu, Bookmark } from 'lucide-react';

export default function Writing() {
  // Array tracking the structural pipelines of your 3 ongoing books
  const ongoingBooks = [
    {
      id: "psychology-matrix",
      title: "The Architecture of Cognitive Overload",
      type: "Human Psychology // Behavioral Systems",
      status: "STAGED_IN_DRAFT (45%)",
      glowColor: "magenta" as const,
      desc: "A rigorous exploration mapping human cognitive limits, anxiety nodes, and psychological coping frameworks against modern high-throughput environments."
    },
    {
      id: "ai-execution",
      title: "Prompt Engineering & Applied AI Protocols",
      type: "Use of AI // Practical Execution Guide",
      status: "COMPILING_ALGORITHMS (70%)",
      glowColor: "cyan" as const,
      desc: "A functional, text-driven manual detailing practical heuristics to anchor Large Language Models, build automated content flows, and scale engineering output."
    },
    {
      id: "development-art",
      title: "Prose, Pixels & Production Pipelines",
      type: "Art of Development // Engineering Aesthetics",
      status: "INITIAL_INDEXING (25%)",
      glowColor: "violet" as const,
      desc: "Analyzing the fine convergence between front-end engineering systems and creative spatial rhythms, parsing why pure technical architecture requires human artistry."
    }
  ];

  const articles = [
    {
      title: "The Architecture of a Scribe: Coding vs Drafting",
      date: "May 2026",
      readTime: "5 min read",
      tags: ["Creative Philosophy", "Systems Engineering"],
      excerpt: "Why organizing variable references with clean nesting rules is identical to composing descriptive parameters in speculative chapters."
    },
    {
      title: "Designing Data-Driven Narrative Loops in Campaign scripts",
      date: "Jan 2026",
      readTime: "7 min read",
      tags: ["Brand Copywriting", "Marketing Mechanics"],
      excerpt: "Analyzing user behavior vectors to draft high-engagement copywriting strategies that trigger direct conversions."
    },
    {
      title: "Why Engineers Reject Aesthetic Design & How Fine Arts Heals It",
      date: "Oct 2025",
      readTime: "10 min read",
      tags: ["Fine Arts", "Aesthetics Core"],
      excerpt: "An exploration into why modern interfaces degrade into cookie-cutter grids, and how tactile clay sculpture principles can restore spatial rhythms."
    }
  ];

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#C850C0]/30 antialiased font-sans">
        
        {/* Spatial Accent Ambient Glow Fields */}
        <div className="absolute top-[15%] left-1/4 w-[350px] h-[350px] bg-[#D4600A]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-10 w-[300px] h-[300px] bg-[#C850C0]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-20">
            <SectionHeading
              title="Words as Architecture"
              subtitle="The craft of written language — designing prose schemas, script strategies, and long-form literature files."
              badge="Writing & Media Core"
            />
          </header>

          {/* SECTION 1 — PRIMARY COMPREHENSIVE LITERARY CORE (PUBLISHED BOOK) */}
          <section className="mb-28">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Bookmark className="h-5 w-5 text-[#D4600A]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
                01 // Published Literature Repository
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0D0D11] border border-white/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-green-500 bg-white/5 border-b border-l border-white/5 tracking-widest uppercase">
                STATUS: GLOBAL_LIVE
              </div>

              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="flex items-center gap-1.5 text-[#D4600A] font-mono text-[9px] uppercase tracking-widest bg-[#D4600A]/5 border border-[#D4600A]/20 px-3 py-1 self-start font-bold">
                  <Flame className="h-3.5 w-3.5" />
                  <span>The Active Core Novel</span>
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                  Chronicles of the Scribing Mind
                </h3>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  An independent long-form book system investigating high-level cognitive load optimization, structural human survival mechanics, and the deep speculative patterns linking human choices to modern computing frameworks.
                </p>
                
                <div>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-3 bg-white text-black font-mono text-xs font-bold px-6 py-4 border border-white hover:bg-transparent hover:text-white transition-all duration-300 uppercase tracking-widest"
                  >
                    <span>Inspect System Book Framework</span>
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-4 border border-white/5 bg-[#050507] p-6 flex flex-col justify-between min-h-[160px]">
                <span className="font-mono text-[8px] text-[#D4600A] uppercase tracking-widest block font-bold">// CRITICAL EXCERPT</span>
                <p className="italic text-xs text-gray-400 font-serif leading-relaxed my-4">
                  "We search for constants in a sea of fluctuating coordinates. We construct database schemas to catch transient memories, unaware that the data we gather is merely a shadow..."
                </p>
                <span className="font-mono text-[7px] text-gray-600 tracking-wider block uppercase">Chapter IV // Page Link 104</span>
              </div>
            </div>
          </section>

          {/* SECTION 2 — ONGOING SYSTEM PROTOCOLS (THE 3 RUNTIME WORKS) */}
          <section className="mb-28">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Cpu className="h-5 w-5 text-[#4FACFE]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
                02 // Ongoing Book Compilations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ongoingBooks.map((book) => (
                <GlowCard key={book.id} id={book.id} glowColor={book.glowColor} className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex flex-col justify-between h-full group hover:border-white/10 transition-colors">
                  <div>
                    <div className="flex justify-between items-center font-mono text-[8px] mb-4">
                      <span className="text-gray-500 uppercase tracking-wider">{book.type}</span>
                    </div>

                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-300">
                      {book.title}
                    </h3>

                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                      {book.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between font-mono text-[8px]">
                    <span className="text-gray-600">// METRIC_LOG_STREAM</span>
                    <span className="text-amber-500 font-bold tracking-widest">{book.status}</span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* SECTION 3 — TECHNICAL STRATEGY COPYWRITING DOMAIN */}
          <section className="mb-28">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <FileText className="h-5 w-5 text-[#C850C0]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
                03 // Content Strategy & Copywriting Practice
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#08080C] border border-white/5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">Social Media Brand Design</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Structuring consistent textual narratives for emerging tech platforms. Engineering specific messaging vectors to secure audience metrics and streamline operational brand engagement pipelines.
                </p>
              </div>

              <div className="p-6 bg-[#08080C] border border-white/5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">Digital Copywriting</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Formulating high-conversion landing page layouts and email briefs, maintaining strict tone alignments. Balancing educational copy rules with compelling story-driven marketing callouts.
                </p>
              </div>

              <div className="p-6 bg-[#08080C] border border-white/5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">Technical Scriptwriting</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Drafting video transcripts, corporate slides, and educational briefs. Ensuring complicated computer and database technologies are mapped clearly into relatable, human-centered language.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 — SELECTED ARTICLES BLOG PROFILES */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Newspaper className="h-5 w-5 text-[#4FACFE]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
                04 // Selected Editorials & Thought Logs
              </h2>
            </div>

            <div className="space-y-6 max-w-5xl">
              {articles.map((article, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#0D0D11] border border-white/5 group hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] text-[#4FACFE] bg-[#4FACFE]/5 border border-[#4FACFE]/10 px-2 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 self-start shrink-0">
                      {article.date} • {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#C850C0] transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-widest text-gray-400 group-hover:text-white uppercase transition-colors">
                    <span>Read System Log Draft</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C850C0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center max-w-xl mx-auto p-4 bg-[#0A0A0F] border border-white/5 flex items-center justify-center gap-3">
              <Compass className="h-4 w-4 text-[#4FACFE]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                More critical articles and literature files are active in local directory buffers.
              </span>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}