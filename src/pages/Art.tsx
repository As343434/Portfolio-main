import React, { useState, useTransition, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PageTransition from '../components/layout/PageTransition';
import { Palette, Layers, Box, Maximize2, X, Compass, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// ART CORE RUNTIME COMPILER: SCRAPE HARDWARE DIRECTORY NODES
// ============================================================================
const localArtAssets = import.meta.glob('../assets/art/**/*.{png,jpg,jpeg,webp,PNG,JPEG}', { eager: true });

interface DynamicArtwork {
  id: string;
  title: string;
  category: string;
  medium: string;
  filePath: string;
  recognition?: string;
  description: string;
}

export default function Art() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [, startTransition] = useTransition();
  const [compiledArtworks, setCompiledArtworks] = useState<DynamicArtwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<DynamicArtwork | null>(null);

  useEffect(() => {
    const temporaryCollection: DynamicArtwork[] = [];

    Object.entries(localArtAssets).forEach(([path, module]: [string, any]) => {
      if (!module || !module.default) return;

      const pathSegments = path.split('/');
      const rawFileName = pathSegments[pathSegments.length - 1];
      const lowerName = rawFileName.toLowerCase();

      // Skip hidden artifacts or explicit book components
      if (lowerName.startsWith('.') || lowerName.includes('book')) return;

      let folderCategory = 'other';
      let detectedMedium = 'Mixed Media Layer';
      let cleanTitle = rawFileName.split('.')[0].replace(/[-_]/g, ' ');
      let badgeLabel = undefined;
      let pieceDescription = 'An investigation into structural compositions, balancing physical layouts with digital asset spaces.';

      // ============================================================================
      // NODE CHANNEL 1: VOLUMETRIC FINE SCULPTURE
      // ============================================================================
      if (lowerName.includes('sclupture') || lowerName.includes('sclputre')) {
        folderCategory = 'sculpture';
        detectedMedium = 'Clay Matrix & Volumetric Plaster';
        badgeLabel = 'State-Level Fine Sculpture';
        pieceDescription = 'Physical structural load analysis. Modeling raw material from 360-degree focal axes directly guides dark visual system hierarchy setups.';
        
        if (lowerName.includes('hanumaji')) cleanTitle = 'Hanuman Ji Sculpture';
        else if (lowerName.includes('jatayu')) cleanTitle = 'Jatayu Sculpture';
        else if (lowerName.includes('ram')) cleanTitle = 'Ram Ji Sculpture';
      } 
      // ============================================================================
      // NODE CHANNEL 2: DIGITAL INTERFACE PRODUCTION VECTOR
      // ============================================================================
      else if (lowerName.includes('ui') || lowerName.includes('ux')) {
        folderCategory = 'uiux';
        detectedMedium = 'High-End Minimalist User Interface';
        pieceDescription = 'Translating negative spatial depth rules into functional layout engineering schemas, dark panels, and micro-interactions.';
        
        if (lowerName.includes('arambh')) cleanTitle = 'Arambh UI/UX Platform';
        else if (lowerName.includes('astro')) cleanTitle = 'Astro UI Interface System';
        else if (lowerName.includes('elven')) cleanTitle = 'ELVN D TRIBE Brand Frame';
        else if (lowerName.includes('mindly')) cleanTitle = 'Mindly Application Ecosystem';
        else if (lowerName.includes('orbit')) cleanTitle = 'Orbit Network Interface Node';
        else if (lowerName.includes('quill')) cleanTitle = 'Quill Canvas Vector Design';
        else cleanTitle = 'System Interface Workspace';
      }

      // Deduplicate overlapping variations of the same name to keep the grid pristine
      const isDuplicate = temporaryCollection.some(
        (item) => item.title.trim() === cleanTitle.toUpperCase().trim() && item.category === folderCategory
      );

      if (!isDuplicate) {
        temporaryCollection.push({
          id: rawFileName + Math.random().toString(36).substring(2, 5),
          title: cleanTitle.toUpperCase(),
          category: folderCategory,
          medium: detectedMedium,
          filePath: module.default,
          recognition: badgeLabel,
          description: pieceDescription
        });
      }
    });

    setCompiledArtworks(temporaryCollection);
  }, []);

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  const filterArtworks = activeTab === 'all'
    ? compiledArtworks
    : compiledArtworks.filter((art) => art.category === activeTab);

  const categories = [
    { id: 'all', label: 'All Artworks' },
    { id: 'sculpture', label: 'Fine Sculpture' },
    { id: 'uiux', label: 'Digital UI/UX' }
  ];

  return (
    <PageTransition>
      <div className="relative w-full z-10 pt-32 pb-24 bg-[#050507] text-white selection:bg-[#C850C0]/30 antialiased font-sans">
        
        <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] bg-[#C850C0]/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-10 w-[350px] h-[350px] bg-[#4FACFE]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <header className="mb-16">
            <SectionHeading
              title="The Creator's Canvas"
              subtitle="Every interface I design carries the hand of someone who has sculpted stone, mixed physical pigments, and traced charcoal vectors."
              badge="Visual Arts Core"
            />
          </header>

          {/* COGNITIVE RELATIONSHIP BLOCK */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard id="core-sculpture" glowColor="magenta" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex flex-col justify-between">
              <div>
                <Box className="h-8 w-8 text-[#C850C0] mb-4" />
                <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-3 font-bold">Fine Sculpture</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  State-level fine sculpture artist. Carving material forces you to watch negative balance, load points, and structural constraints from 360 degrees. This directly establishes spatial layouts for complex web apps.
                </p>
              </div>
              <span className="font-mono text-[8px] text-gray-600 tracking-widest uppercase mt-6">// VOLUMETRIC_INTUITION</span>
            </GlowCard>

            <GlowCard id="core-digital" glowColor="cyan" className="p-6 bg-[#0D0D11] border border-white/5 rounded-none flex flex-col justify-between">
              <div>
                <Layers className="h-8 w-8 text-[#4FACFE] mb-4" />
                <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-3 font-bold">Digital UI/UX</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Translating physical color values and structural weights to screens. Designing dark layouts, clean component grids, and low-contrast control panels that prevent eye fatigue.
                </p>
              </div>
              <span className="font-mono text-[8px] text-gray-600 tracking-widest uppercase mt-6">// DIGITAL_COMPILATION</span>
            </GlowCard>
          </section>

          {/* FILTER NAVIGATION PANEL */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 rounded-none ${
                      activeTab === cat.id
                        ? 'bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                        : 'text-gray-400 hover:text-white bg-[#0D0D11] border-white/5 hover:border-white/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                STREAM_INDEX: {filterArtworks.length} BUFFERS MOUNTED
              </span>
            </div>

            {/* LIVE GALLERY PRESENTATION */}
            {filterArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterArtworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArtwork(art)}
                    className="group relative flex flex-col gap-3 cursor-pointer"
                  >
                    <div className="relative overflow-hidden border border-white/5 bg-[#050507] aspect-square w-full flex items-center justify-center">
                      <img
                        src={art.filePath}
                        alt={art.title}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-xs">
                        <div className="p-4 bg-[#050507] border border-white/10 text-white rounded-none">
                          <Maximize2 className="h-4 w-4 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-start px-1">
                      <div>
                        <h4 className="font-mono font-bold text-xs tracking-wide text-white uppercase">
                          {art.title}
                        </h4>
                        <p className="font-sans text-[11px] text-gray-500 mt-0.5 font-light">
                          {art.medium}
                        </p>
                      </div>
                      {art.recognition && (
                        <span className="font-mono text-[8px] text-[#D4600A] border border-[#D4600A]/30 bg-[#D4600A]/5 px-2 py-0.5 uppercase tracking-wider shrink-0">
                          HONORED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-white/5 bg-[#0D0D11] p-16 flex flex-col items-center justify-center text-center">
                <ImageIcon className="h-8 w-8 text-gray-600 mb-4 animate-pulse" />
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">STREAM MATCH NULL</span>
              </div>
            )}
          </section>

        </div>

        {/* EXPANDED SYSTEM LIGHTBOX FRAME */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#050507]/95 backdrop-blur-md flex items-center justify-center p-6"
            >
              <div className="relative max-w-4xl w-full bg-[#0D0D11] border border-white/10 p-6 md:p-8 rounded-none flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 p-2.5 bg-[#050507] border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  <div className="border border-white/5 bg-[#050507] aspect-square w-full flex items-center justify-center overflow-hidden">
                    <img src={selectedArtwork.filePath} alt={selectedArtwork.title} className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-5 self-stretch justify-center">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#4FACFE] block font-bold">// SYSTEM NODE MATRIX</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1 mb-2">{selectedArtwork.title}</h2>
                    <p className="font-mono text-[10px] text-gray-400 border border-white/5 bg-[#050507] px-3 py-1.5 inline-block">{selectedArtwork.medium}</p>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed bg-[#050507] p-4 border border-white/5">{selectedArtwork.description}</p>
                  {selectedArtwork.recognition && (
                    <div className="p-3 bg-[#D4600A]/5 border border-[#D4600A]/20 flex items-center gap-3">
                      <Compass className="h-4 w-4 text-[#D4600A] shrink-0 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4600A]">{selectedArtwork.recognition}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}