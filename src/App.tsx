import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Layout level items
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy loading all 11 pages for best-in-class loading metrics and seamless split bundling
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Journey = lazy(() => import('./pages/Journey'));
const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Art = lazy(() => import('./pages/Art'));
const Book = lazy(() => import('./pages/Book'));
const Music = lazy(() => import('./pages/Music'));
const Writing = lazy(() => import('./pages/Writing'));
const Contact = lazy(() => import('./pages/Contact'));

// Component fallback loader screen
function SuspenseLoader() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="w-10 h-10 rounded-full border-4 border-[#3B82F6] border-t-transparent animate-spin mb-3" />
      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest animate-pulse">
        Preloading Dimension Stream...
      </span>
    </div>
  );
}

// Layout Wrapper to lock page transitions and scroll setups
function LayoutWrapper() {
  const location = useLocation();

  // Scroll back to page top on change
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative z-10 selection:bg-[#3B82F6] selection:text-white">
      {/* Universal Fixed/Frosted Navbar block */}
      <Navbar />

      {/* Main Page Content Body with Suspense routing limits */}
      <main className="flex-grow">
        <Suspense fallback={<SuspenseLoader />}>
          <AnimatePresence mode="wait">
            {/* FIXED: Removed the object spread hack. 
              Passing 'location' and 'key' explicitly so React can track route transitions safely.
            */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/art" element={<Art />} />
              <Route path="/book" element={<Book />} />
              <Route path="/music" element={<Music />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} /> {/* Graceful fallback home redirect */}
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Global Sarthak copyright footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}