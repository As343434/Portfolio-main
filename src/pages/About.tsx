import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import HeroCanvas from '../components/three/HeroCanvas';
import { Award, GraduationCap, Users, Zap, Layers } from 'lucide-react';

export default function About() {
  const cardsData = [
    { title: "Data Scientist", desc: "Modeling trends and tracking database metrics securely.", icon: zapGradientCode("cyan") },
    { title: "Full-Stack Engineer", desc: "Deploying high-performance React frontends and Python APIs.", icon: zapGradientCode("magenta") },
    { title: "Fine Artist", desc: "Translating physical sculpture dimensions into digital wireframes.", icon: zapGradientCode("violet") },
    { title: "Classical Vocalist", desc: "Injecting acoustic breathing discipline and rhythm into system loops.", icon: zapGradientCode("orange") },
    { title: "Published Author", desc: "Drafting campaign prose, literature transcripts, and copywriting structure.", icon: zapGradientCode("crimson") },
    { title: "UI/UX Designer", desc: "Designing eye-safe color harmony palettes for technical widgets.", icon: zapGradientCode("cyan") }
  ];

  function zapGradientCode(color: 'cyan' | 'magenta' | 'violet' | 'orange' | 'crimson') {
    const colorClasses = {
      cyan: 'text-[#3B82F6]',
      magenta: 'text-[#C850C0]',
      violet: 'text-gray-400',
      orange: 'text-[#3B82F6]/70',
      crimson: 'text-[#C850C0]/80'
    }[color];
    return <Zap className={`h-5 w-5 ${colorClasses}`} />;
  }

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-28 pb-20 bg-[#050507] text-white antialiased selection:bg-[#3B82F6]/30">
        
        {/* PARALLAX COSMIC BACKGROUND */}
        <div className="absolute inset-x-0 top-0 h-[450px] overflow-hidden pointer-events-none sticky -z-10 bg-gradient-to-b from-[#0A0A0A] to-transparent">
          <HeroCanvas />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          
          {/* HERO TEXT HEADER */}
          <header className="mb-20 text-center relative z-20">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3B82F6] block mb-3 font-bold animate-pulse">
              // The Polymath Identity Map
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
              Who is Sarthak?
            </h1>
            <div className="mt-4 w-12 h-px bg-[#3B82F6] mx-auto" />
          </header>

          {/* SECTION 1 — THE PERSON */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-20">
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="sticky top-28 w-full max-w-sm border border-white/5 bg-[#0D0D11] p-3 rounded-none group">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#050507] flex items-center justify-center">
                  <img
                    src="/src/assets/profile.webp"
                    alt="Sarthak Principal Portrait"
                    className="w-full h-full object-cover scale-100 opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const p = e.currentTarget.parentElement;
                      if (p) {
                        const fallback = p.querySelector('.profile-err-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="profile-err-fallback hidden flex-col items-center text-gray-600 font-mono text-[9px]">
                    <Layers className="h-5 w-5 text-[#3B82F6] mb-1 animate-pulse" />
                    <span>IMAGE_RESOLVING</span>
                  </div>
                </div>
                <span className="font-mono text-[7px] text-gray-600 tracking-widest uppercase mt-2 block text-center">
                  SRCDIR_PTR // /src/assets/profile.webp
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              <SectionHeading
                title="The Engineering Polymath"
                subtitle="A B.Tech CSE student colliding data analysis mathematics with structural sculpture"
              />
              
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                I am Sarthak, currently completing my Bachelor of Technology in Computer Science & Engineering (Data Science) in collaboration with industry leader **IBM** at **K.R. Mangalam University** (Expected 2027).[cite: 2] Since day one of the first semester, I have had the privilege to stand as the **appointed Class Representative (CR)**, bridging operations between university administrators, professors, and hundreds of classmates.[cite: 2]
              </p>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                My engineering focus centers heavily around structured analytics and data science databases. But what truly defines me is my extensive background in classical music, physical fine arts (state-level fine sculpture and collage design), and published literary authorship.[cite: 2] This cognitive diversity establishes an unconventional approach: I view system design through plastic arts principles, spatial architecture, and auditory rhythms.[cite: 2]
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-[#0D0D11] border border-white/5 rounded-none flex gap-4 items-start">
                  <GraduationCap className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">IBM Specialization</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-1">Directly trained in IBM Watson AI platforms, exploratory data pipelines, and advanced predictive modeling.[cite: 2]</p>
                  </div>
                </div>

                <div className="p-4 bg-[#0D0D11] border border-white/5 rounded-none flex gap-4 items-start">
                  <Users className="h-5 w-5 text-[#C850C0] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Governance & Leadership</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-1">Appointed Class Representative + Core Orientation Mentor facilitating integration circles for inbound candidates.[cite: 2]</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 — THE COGNITIVE PHILOSOPHY */}
          <section className="mb-24 border border-white/5 p-8 md:p-12 bg-[#0D0D11] rounded-none backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 border-l border-[#3B82F6] pl-6 py-2">
                <blockquote className="font-sans text-sm sm:text-base font-light text-white leading-relaxed">
                  "The spatial precision needed to carve clay into a delicate sculpture is mathematically identical to organizing nested arrays, managing server hierarchies, and designing distraction-free parent UX panels on a canvas."
                </blockquote>
              </div>
              <div className="md:col-span-7 flex flex-col gap-4 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
                  // How Art Informs My Algorithms
                </h3>
                <p>
                  I reject the standard division between engineers and creators. To program a constraint-driven university schedule solver in combinatorics requires highly structured imagination — a skill directly developed by writing lyrics for creative tracks, plotting novel chapters, and blocking out geometric shadows in architectural sketching.[cite: 2]
                </p>
                <p>
                  Because I understand how palette color harmonies capture human eyeballs directly in fine collage art, I build user systems with deep aesthetic intentionality—balancing structural form, interface rhythm, and computational performance smoothly across everything I design.[cite: 2]
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 — THE MULTIDISCIPLINARY STACK PANEL */}
          <section className="mb-24">
            <SectionHeading
              title="The Six Dimensions"
              subtitle="The distinct functional fields Sarthak operates in simultaneously"
              badge="Cognitive Spectrum"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardsData.map((dimension, idx) => (
                <GlowCard key={idx} id={`about-dim-${idx}`} glowColor={idx % 3 === 0 ? 'cyan' : idx % 3 === 1 ? 'magenta' : 'violet'} className="bg-[#0D0D11] border border-white/5 rounded-none p-5">
                  <div className="mb-4">{dimension.icon}</div>
                  <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">{dimension.title}</h3>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">{dimension.desc}</p>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* SECTION 4 — UNIVERSITY EDUCATION MATRIX */}
          <section className="mb-12">
            <SectionHeading
              title="Academic Foundation"
              subtitle="Where theory, leadership governance, and collaborative partnerships converge"
              badge="Standard Education"
            />

            <GlowCard id="edu-card-core" glowColor="cyan" className="p-8 bg-[#0D0D11] border border-white/5 rounded-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
                <div>
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-1">
                    K.R. Mangalam University
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Bachelor of Technology (B.Tech) in Computer Science & Engineering[cite: 2]
                  </p>
                  <p className="font-mono text-[9px] text-[#3B82F6] font-bold uppercase mt-1">
                    // Specialization: Data Science (In direct collaboration with IBM)[cite: 2]
                  </p>
                </div>
                <div className="text-left">
                  <span className="font-mono text-[10px] text-white bg-white/5 border border-white/10 px-3 py-1.5 uppercase tracking-wider font-bold">
                    2023 — 2027 (Runtime)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#050507] border border-white/5 text-gray-400">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Class Representative (CR)</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-1">Appointed from semester one day one.[cite: 2] Mentoring student workflows, coordinating academic schedules with deans, and commanding group operations.[cite: 2]</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#050507] border border-white/5 text-gray-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">University Orientation Team</h4>
                    <p className="text-[11px] text-gray-400 font-light mt-1">Core member facilitating student integration circles.[cite: 2] Guided prospective students, orchestrated institutional orientations, and managed stage transitions.[cite: 2]</p>
                  </div>
                </div>
              </div>
            </GlowCard>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}