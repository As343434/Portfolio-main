import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when URL changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Journey', path: '/journey' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Art & Design', path: '/art' },
    { label: 'The Book', path: '/book' },
    { label: 'Music & Voice', path: '/music' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Inject custom 3D orbital tilting animation keyframes */}
      <style>{`
        @keyframes orbit-alpha {
          0% { transform: rotate3d(1, 1, 0, 0deg); }
          100% { transform: rotate3d(1, 1, 0, 360deg); }
        }
        @keyframes orbit-beta {
          0% { transform: rotate3d(-1, 1, 1, 360deg); }
          100% { transform: rotate3d(-1, 1, 1, 0deg); }
        }
        .animate-orbit-1 { animation: orbit-alpha 6s linear infinite; }
        .animate-orbit-2 { animation: orbit-beta 4s linear infinite; }
      `}</style>

      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-t-4 border-[#3B82F6] ${
          isScrolled
            ? 'bg-[#050507]/90 backdrop-blur-[24px] border-b border-white/5 shadow-[0_4px_30px_rgba(59,130,246,0.08)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand Frame with Integrated 3D Moving Orbit Logo */}
          <Link
            to="/"
            title="Sarthak Portfolio Home"
            className="flex items-center gap-3.5 group font-sans font-bold tracking-wider text-xl select-none"
          >
            {/* 3D Moving Orbit Container Element */}
            <div className="relative w-7 h-7 flex items-center justify-center pointer-events-none scale-105">
              {/* Static Central Core Core */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6] group-hover:bg-[#60A5FA] group-hover:shadow-[0_0_12px_#60A5FA] transition-all duration-300" />
              
              {/* Orbit Ring Loop Alpha (Tilted Axis 1) */}
              <div className="absolute inset-0 border border-[#3B82F6]/30 rounded-full animate-orbit-1 group-hover:border-[#60A5FA]/60 transition-colors duration-300" 
                   style={{ transformStyle: 'preserve-3d', perspective: '100px' }}>
                {/* Micro Satellite Node on Ring 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3B82F6] rounded-full shadow-[0_0_6px_#3B82F6]" />
              </div>

              {/* Orbit Ring Loop Beta (Inverse Tilted Axis 2) */}
              <div className="absolute inset-0 border border-[#C850C0]/20 rounded-full animate-orbit-2 group-hover:border-[#C850C0]/50 transition-colors duration-300"
                   style={{ transformStyle: 'preserve-3d', perspective: '100px' }}>
                {/* Micro Satellite Node on Ring 2 */}
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-1 h-1 bg-[#C850C0] rounded-full shadow-[0_0_6px_#C850C0]" />
              </div>
            </div>

            {/* Typography Asset Vector */}
            <span className="text-[#F5F5F5] group-hover:text-white transition-colors tracking-widest text-lg font-black uppercase">
              SARTHAK
            </span>
          </Link>

          {/* Large Screen Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-sans text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/10"
            >
              <Sparkles className="h-3 w-3 animate-pulse text-white" />
              <span>Hire Me</span>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#F5F5F5] hover:text-white focus:outline-none transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlaid Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(25px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-[#050507]/95 flex flex-col justify-center px-8 lg:hidden border-t-4 border-[#3B82F6]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[180px] h-[180px] rounded-full bg-[#3B82F6]/5 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-[#60A5FA]/10 blur-[90px] pointer-events-none" />

            <div className="flex flex-col gap-5 max-w-md mx-auto w-full relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#3B82F6] text-center border-b border-white/5 pb-2">
                Sarthak's Workspace Ecosystem
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full text-center"
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 font-sans text-lg font-bold tracking-wide transition-all ${
                        isActive
                          ? 'text-[#3B82F6] scale-105 filter drop-shadow-[0_0_8px_#3B82F6]'
                          : 'text-gray-400 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-6 flex justify-center gap-4">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white text-xs font-sans px-6 py-2.5 rounded-full text-center font-semibold w-full max-w-[200px]"
                >
                  Initialize Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}