import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { Mail, Phone, Github, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#3B82F6]/30 antialiased font-sans">
        
        {/* Glow point light highlights */}
        <div className="absolute top-[20%] left-10 w-[350px] h-[350px] bg-[#3B82F6]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-10 w-[300px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-16 text-center">
            <SectionHeading
              title="Let's Build Something Extraordinary."
              subtitle="Establishing direct pathways to coordinate grids, launch database clusters, or collaborate on digital interfaces."
              badge="Initialize Connection"
            />
          </header>

          <div className="max-w-4xl mx-auto">
            
            {/* INSTRUCTIONAL CONTEXT HEADER */}
            <div className="flex flex-col gap-3 text-center mb-12">
              <span className="font-mono text-[10px] text-[#3B82F6] uppercase tracking-[0.25em] font-bold">
                Direct Sync Matrix
              </span>
              <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
                Skip the asynchronous request pipelines. Use the communication coordinates below to initialize direct network synchronization.
              </p>
              <div className="w-16 h-px bg-white/10 mx-auto mt-2" />
            </div>

            {/* SYMMETRIC CONTACT CORE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* PHONE NODE */}
              <a
                href="tel:+919650827710"
                className="group"
              >
                <GlowCard glowColor="cyan" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex items-center gap-5 transition-colors group-hover:border-white/10">
                  <div className="h-12 w-12 bg-[#050507] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#3B82F6] transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Voice Core</span>
                    <span className="font-mono text-sm font-bold text-white tracking-tight select-all">
                      +91 9650827710
                    </span>
                  </div>
                </GlowCard>
              </a>

              {/* WHATSAPP NODE */}
              <a
                href="https://wa.me/919650827710"
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <GlowCard glowColor="green" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex items-center gap-5 transition-colors group-hover:border-white/10">
                  <div className="h-12 w-12 bg-[#050507] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Instant Packet Sync</span>
                    <span className="font-mono text-sm font-bold text-white tracking-tight">
                      WhatsApp Messenger
                    </span>
                  </div>
                </GlowCard>
              </a>

              {/* EMAIL NODE */}
              <a
                href="mailto:sarthakchaudhary0002@gmail.com"
                className="group"
              >
                <GlowCard glowColor="magenta" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex items-center gap-5 transition-colors group-hover:border-white/10">
                  <div className="h-12 w-12 bg-[#050507] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#C850C0] transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Secure Mailbox</span>
                    <span className="font-mono text-xs font-bold text-white tracking-tight break-all select-all">
                      sarthakchaudhary0002@gmail.com
                    </span>
                  </div>
                </GlowCard>
              </a>

              {/* GITHUB NODE */}
              <a
                href="https://github.com/As343434"
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <GlowCard glowColor="white" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex items-center gap-5 transition-colors group-hover:border-white/10">
                  <div className="h-12 w-12 bg-[#050507] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block mb-1">Repository Mainframe</span>
                    <span className="font-mono text-sm font-bold text-white tracking-tight">
                      github.com/As343434
                    </span>
                  </div>
                </GlowCard>
              </a>

            </div>

            {/* BOTTOM STATUS FOOTER BAR */}
            <div className="mt-12 text-center p-4 bg-[#08080C] border border-white/5 font-mono text-[8px] tracking-widest text-gray-600 uppercase">
              // CONNECTIVITY_GRID_STATUS: ONLINE_AND_LISTENING
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
}