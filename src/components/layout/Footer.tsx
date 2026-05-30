import React from 'react';
import { Mail, Github, Compass, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#050507] py-12 px-6 mt-auto overflow-hidden text-white antialiased">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] rounded-full bg-[#3B82F6]/5 blur-[45px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Branding Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <div className="flex items-center gap-1.5 font-sans font-bold tracking-widest text-white">
            <span>SARTHAK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
          </div>
          <p className="text-[11px] font-mono text-gray-500">
            CS Engineer & Data Scientist • Collaborative Polymathy
          </p>
        </div>

        {/* Copy Notice */}
        <div className="flex flex-col items-center gap-1.5 text-center font-sans text-xs text-gray-400">
          <span>© 2026 Sarthak. Built with intent.</span>
          <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5 justify-center">
            <Compass className="h-3 w-3 text-[#3B82F6] animate-spin-slow" />
            Designed at the Intersection of Logic & Art
          </span>
          {/* Elegant Dark details */}
          <span className="text-[8px] tracking-widest uppercase text-gray-600 font-mono">
            Encrypted Session Active • SHA-256 | Terminal ID: 882-AX-99
          </span>
        </div>

        {/* Social Hooks & Scroll Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="mailto:sarthakchaudhary0002@gmail.com"
              className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-all duration-300"
              title="Email Sarthak"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/As343434"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white hover:text-[#3B82F6] transition-colors duration-300"
            title="Scroll to Top"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}